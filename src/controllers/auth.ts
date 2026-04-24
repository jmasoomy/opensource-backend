import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users, User } from "../infrastructure/authStore";

const secretKey = "jasim_secret";

export const registerUser = (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }

  const newUser: User = {
    id: users.length + 1,
    username,
    password,
    role: role === "super" ? "super" : "user"
  };

  users.push(newUser);

  return res.status(201).json({
    id: newUser.id,
    username: newUser.username,
    role: newUser.role
  });
};

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    secretKey,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token
  });
};