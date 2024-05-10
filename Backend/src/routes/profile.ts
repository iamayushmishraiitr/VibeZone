import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  const val = req.query.id;
  if(!val)  return res.status(404)
   const val2= parseInt(val.toString())
   const arr=  await prisma.user.findUnique({
    where:{
      id:val2
    },
   }
  )
  console.log(arr ," asdsads  adsa This is arr ")
if(!arr) return res.status(404).send("No arr ")
     let arr2= arr?.post 
   if(!arr2) return res.status(404).send("NO arr2   ")
    let arr3= [] ;
    for(let i=0 ;i<arr2.length;i++)
      {
           const resp= await prisma.post.findUnique({
            where:{id: parseInt(arr2[i])}
           })
           arr3.push(resp)
      }
      console.log("This is profile ," , arr3  , "  " , val )
   res.status(200).send({arr3 : arr3 , val:arr})
}
)
export default router;
