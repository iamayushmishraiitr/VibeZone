import express from "express";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
const route = express.Router();

route.post("/", async (req, res) => {
  const user: {
    id: number;
    name: string;
    image: string;
  } = {
    id: req.body.id,
    name: req.body.username,
    image: req.body.image,
  };
  const id1: string = req.body.id1;
  if (!user.id || !user.name || !user.image || !req.body.id)
    return res.status(404).send("Please Send Full Data");
  try {
    const users = await prisma.user.update({
      where: {
        id: parseInt(id1),
      },
      data: {
        request: {
          push:  user.id.toString()
        },
      },
    });

    if (!users) {
      return res.status(404).send("User not found");
    }
   const res2= await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        requestrecieve: {
          push: id1 
        },
      },
    });

    return res.status(200)
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

/*==================================================DELETE===================================================*/
route.delete("/", async (req, res) => {
  const user: {
    id: number;
    name: string;
    image: string;
  } = {
    id: req.body.id,
    name: req.body.username,
    image: req.body.image,
  };
  const id1: string = req.body.id1;

  if (!user.id || !user.name || !user.image || !req.body.id) {
    return res.status(404).send("Send Complete Dtaa");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id1),
      },
    });

    if (!existingUser) {
      return res.status(404).send("User not found.");
    }
    const arr = existingUser.request;
    const newarr = arr
    const newarr2 = newarr
      .filter((item) => item !== (user.id).toString())

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id1),
      },
      data: {
        request: {
          set: newarr2,
        },
      },
    });
   
    const existingUser2 = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!existingUser2) {
      return res.status(404).send("User not found.");
    }
    const arrr = existingUser2.requestrecieve;
    const newarrr = arrr
    const newarrr2 = newarrr
      .filter((item) => item !==  (id1))


    const updatedUser2 = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        requestrecieve: {
          set: newarrr2,
        },
      },
    });
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

/*===============================================================================GET=====================*/
route.get('/', async(req,res)=>{
   const id = req.query.id 
   console.log("Thsi is ID"  ,id )
   if(!id) return  res.status(404).send("Please send The id ")
     const data= await prisma.user.findUnique({
      where :{
        id: parseInt(id.toString())
      }
     })
     if(!data) return res.status(404).send("You valid User")
    const arr= data.requestrecieve
     let newarr :string[]=[] ;
     for(let i=0 ;i<arr.length ;i++)
      {
          const curid= arr[i] ;
          const res1=   await prisma.user.findUnique({ 
            where :{
              id: parseInt(curid.toString())
            }
           })
           //console.log("Here is New Arr   ",res1)
           if(!res1) return res.status(404)
            
           newarr.push(JSON.stringify(res1))
      }
      return res.status(200).send(newarr) 
      
})
export default route;
