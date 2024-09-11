import express from "express";
import passport from "passport";
import session from "express-session";
import "./config/passportConfig";
import authRoutes from "./routes/authRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

// Test route
app.use("/ping", (req, res) => {
  res.send("pong");
});

export default app;
