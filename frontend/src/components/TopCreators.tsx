import { useState,useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Loader from "./Loader";
type User = {
  id     :        number      
  username  :     string  
  email     :     string
  password    :   string
  bio        :    string   
  userimage  :     string   
  liked     :     string[]
  saved     :     string[]
  request    :    string[]
  requestrecieve :string[]
  followers    :  string[]
  following   :   string[]
  post    :        string[]
};
const TopCreators = () => {
    const [creators,setCreators]=useState<User[]>([])
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        axios.get('http://localhost:3000/user')
             .then(res=> setCreators(res.data )) 
              .catch((err)=> console.log(err))
              setLoader(false)
       },[])
       const id = localStorage.getItem("userId") ;
       let creators2 :User[]=[]
       if(id)  creators2= creators.filter((item)=> (item.id)!== parseInt(id) )
       // console.log("Here is Createors2   " , creators2)
  return (
    <>
    <h3 className="h3-bold text-2xl ml-14 font-bold ">Top Creators</h3>
    {  loader ?(<div className="w-[40%] pl-3 bg-black"><Loader/></div>) :
         (
          <ul className="grid 2xl:grid-cols-2 gap-4">
            {creators2?.map((creator) => (
              <li key={creator?.id} className="flex items-center justify-center h- mt-8">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
         )
        }
      </>
  )
}

export default TopCreators