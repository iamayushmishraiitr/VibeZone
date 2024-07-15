import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from   "./LoaderModal"

const Following: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  
  const [val2,setVal2] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/getFollowing", {
        params: { id: localStorage.getItem("userId") },
      })
      .then((res) => setVal2(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Delete = async (id2: any) => {
    setDel(true);
    try {
      await axios.delete("http://localhost:3000/getFollowing", {
        data: {
          id2: id2,
          id1: localStorage.getItem("userId"),
        },
      });
      setDel(true)
      toast.success("Deleted Successfully");
      window.location.reload();
    } catch (err) {
      setDel(false);
      toast.error("Error occurred");
    }
  };

   const val= val2.map((it:string)=>JSON.parse(it))  ;
  return (
    <div>
      <div
        className="flex flex-row bg-slate-800 items-center justify-center w-34"
        onClick={handleOpen}
      >
        <h1 className="mr-2 text-xl text-purple-400">{val && val?.length}</h1>
        <h1 className="text-xl">Following</h1>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {  del ? <Loader/> :
            <div className="bg-black h-[600px] w-[800px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-white text-center p-4">
            <h2  className="text-2xl  mb-4">
              Followers List
            </h2>
            <div id="modal-description">
              {val && val.length > 0 ? (
                <ul>
                  {val.map((it: any, index: number) => (
                    <li key={index}>
                      <div className="flex flex-row items-center mt-4 ml-5">
                        <img
                          src={
                            it.userimage === ""
                              ? "../src/assets/fileupload.svg"
                              : it.userimage
                          }
                          className="rounded-full mt-3 w-[6rem] ml-5 h-[6rem]"
                          alt="User"
                        />
                        <div className="w-[70%] h-auto flex justify-between">
                        <h1 className="ml-6 text-xl font-bold text-purple-700">{it.username}</h1>
                        <button
                          onClick={() => Delete(it.id)}
                          className="h-[3rem] w-20 bg-red-500 mr-7 rounded-lg mt-4 hover:bg-red-200 hover:text-black"
                        >
                         <h1>Delete</h1>
                        </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No following</p>
              )}
            </div>
          </div>
        </div>
}
      </Modal>
    </div>
  );
};

export default Following;
