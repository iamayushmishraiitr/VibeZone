import express from "express";
import { PrismaClient, User } from "@prisma/client";
import generateToken from "../Auth/generateToken";
const prisma = new PrismaClient();
const route = express.Router();

route.post("/", async (req, res) => {

  const {username,password} =req.body;
  if (!username || !password) return res.status(404).send("Send Full credentials");
  try {
    const users = await prisma.user.findUnique({
      where: {
         username:username
      },
    });
    if (!users) { 
        return res.status(404).send("User not found");
      }

      if(users.password!=password) return res.status(404).send("Invalid Password");
      const token = generateToken(username,password)
      res.status(200).json({message:users.id ,token:token}) 
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});
export  default route