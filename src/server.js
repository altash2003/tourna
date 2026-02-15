require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const expressLayouts = require("express-ejs-layouts");

const connectDB = require("./config/db");

const publicRoutes = require("./routes/public.routes");
const authRoutes = require("./routes/auth.routes");
const adminPlayersRoutes = require("./routes/admin.players.routes");
const adminTournamentRoutes = require("./routes/admin.tournament.routes");
const adminRandomizeRoutes = require("./routes/admin.randomize.routes");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 6
    }
  })
);

app.use((req, res, next) => {
  res.locals.isAdmin = !!(req.session && req.session.isAdmin);
  next();
});

app.use("/", publicRoutes);
app.use("/", authRoutes);

app.use("/admin", adminPlayersRoutes);
app.use("/admin", adminTournamentRoutes);
app.use("/admin", adminRandomizeRoutes);

app.use((req, res) => {
  return res.status(404).render("public/home", {
    title: "Not Found",
    tournament: { registrationOpen: false, maxPlayers: 30 },
    approvedCount: 0
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
