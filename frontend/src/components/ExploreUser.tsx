
  import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
const ExploreUser = (props:any) => {
    const item= props.item
    const [con, setCon] = useState(true);
  const [del, setDel] = useState(true) ;
  const navigate = useNavigate();
  const confirm = async (id2:any,data1:any) => {
    setCon(false);
    try {
    await  axios.post("http://localhost:3000/explore", {
        id2: id2,
        id1: localStorage.getItem("userId"),
        data:JSON.stringify(data1)
      });
        toast.success("Request Accepted")
         window.location.reload()
    } catch (err) {
      setCon(true);
     toast.error("Error occured") ;
    }
  };
  const Delete = async (id2:any) => {
    setDel(false);
    try {
     await axios.delete("http://localhost:3000/explore", {
        data: {
          id2: id2,
          id1: localStorage.getItem("userId"),
        },
      });
      toast.success("Request Declined Successfully")
      window.location.reload()
    } catch (err) {
      setDel(true);
      toast.error("Error occured") ;
    }
  };
  return (
    <>
    <div className="h-[100%]">
      <img
        src={item.userimage==="" ?"../src/assets/fileupload.svg" : item.userimage}
        className="rounded-full mt-3 w-[8rem]  ml-7 mr-12 h-[8rem]"
      ></img>
    </div>
    <div className="flex flex-col mr-12 ml-12 ">
      <h1
        onClick={() => navigate(`/people/${item.id}`)}
        className="text-2xl font-bold"
      >
        <span className="text-purple-500 cursor-pointer">
          {item.username}
        </span>{" "}
        Send You a follow request
      </h1>
      <div className="flex gap-4  mt-10 w-[100%]">
        <button
          onClick={()=>confirm(item.id,item)}
          className="h-[3rem] w-20 bg-purple-500 rounded-lg mr-4 hover:bg-purple-200 hover:text-black"
        >
          {con ? (
            <span>Confirm</span>
          ) : (
            <span>Confirming...</span>
          )}
        </button>
        <button
          onClick={()=>Delete(item.id)}
          className="h-[3rem] w-20 bg-red-500 rounded-lg mr-4 hover:bg-red-200 hover:text-black"
        >
          {del ? (
            <span>Delete</span>
          ) : (
            <span>Deleting...</span>
          )}
        </button>
      </div>
    </div>
  </>
  )
}

export default ExploreUser