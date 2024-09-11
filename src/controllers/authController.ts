import { NextFunction, Request, Response } from "express";
import { registerUser } from "../services/userService";
import passport, { DoneCallback } from "passport";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await registerUser(username, password);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const login = (req: Request, res: Response) => {
  // @ts-ignore
  passport.authenticate("local", (err, user, info) => {
    if (err)
      return res.status(500).json({ message: "Authentication failed", err });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed", err });
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      // Remove the session cookie
      res.clearCookie("connect.sid");
      res.status(200).send("Logged out");
    });
  });
};
