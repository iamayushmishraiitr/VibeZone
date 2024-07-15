import Postcards from "@/components/Postcards";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import EditIcon from '@mui/icons-material/Edit';
import Followers from "@/components/Modals/Follower";
import Followings from "@/components/Modals/Following";

const Profile = () => {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [state, setState] = useState<number>(1);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/profile", {
        params: { id: id },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem("userId") === id) {
      axios
        .get("http://localhost:3000/saved", {
          params: { id: id },
        })
        .then((res) => {
          setData2(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  const editProfile = async () => {
    navigate("/EditProfile");
  };

  const curstate = (val: number) => {
    setState(val);
  };

  const val = data.val;
  const arr = data.arr3;
  console.log("Assaasdsacsa a", val);

  return (
    <div className="bg-black text-white h-[100vh] w-[100vw] items-center justify-center">
      <div className="flex justify-between w-[100%] h-[20%]">
        <div className="flex w-[100%] h-[70%]">
          <div className="flex flex-row w-[16%]">
            <img
              src={val?.userimage === "" ? "../../src/assets/fileupload.svg" : val?.userimage}
              alt="Profile image"
              className="rounded-full h-[120px] w-[120px]"
            /> 
          </div>
          <div className="flex flex-col ml-5 w-[90%]">
            <h1 className="text-3xl mb-3">{val && val.username}</h1>
            <div className="flex gap-8 mt-3 items-center justify-center xl:justify-start flex-wrap z-20">
              <div className="flex flex-row gap-7">
                <div className="flex flex-row bg-slate-800 items-center justify-center w-20">
                  <h1 className="mr-2 text-xl text-purple-400">
                    {arr && arr.length}
                  </h1>
                  <h1 className="text-xl">Posts</h1>
                </div>
                {localStorage.getItem("userId") === id ? (
                  <>
                    <Followers />
                    <Followings />
                  </>
                ) : (
                  <>
                    <div className="flex flex-row bg-slate-800 items-center justify-center w-34">
                      <h1 className="mr-2 text-xl text-purple-400">
                        {val && val?.followers?.length}
                      </h1>
                      <h1 className="text-xl">Followers</h1>
                    </div>
                    <div className="flex flex-row bg-slate-800 items-center justify-center w-34">
                      <h1 className="mr-2 text-xl text-purple-400">
                        {val && val?.following?.length}
                      </h1>
                      <h1 className="text-xl">Following</h1>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {localStorage.getItem("userId") === id && (
          <div className="flex flex-row cursor-pointer justify-center pt-2" onClick={editProfile}>
            <EditIcon sx={{ color: "white", fontSize: "34px" }} />
            <h1 className="text-xl ml-2">Edit Profile</h1>
          </div>
        )}
      </div>
      <div className="flex gap-5 h-[10%] mb-1">
        <button
          className={`flex flex-row items-center w-[10%] justify-center h-full ${
            state === 1 && "bg-slate-800"
          } hover:border-2 hover:rounded-lg rounded-lg mr-3 pt-1 h-full`}
          onClick={() => curstate(1)}
        >
          <img
            src="../src/assets/fileupload.svg"
            alt="Post Images"
            className="h-12"
          />
          <h1>Posts</h1>
        </button>
        {localStorage.getItem("userId") === id && (
          <button
            className={`flex flex-row items-center w-[10%] justify-center h-full ${
              state === 2 && "bg-slate-800"
            } hover:border-2 hover:rounded-lg mr-3 pt-1 h-full`}
            onClick={() => curstate(2)}
          >
            <img
              src="../src/assets/saved.svg"
              alt="Saved Images"
              className="h-12"
            />
            <h1>Saved Posts</h1>
          </button>
        )}
      </div>
      <div className="w-[80%] h-[70%] bg-slate-800 flex flex-col overflow-auto">
        {state === 1 && (
          <>
            {data && data.length === 0 ? (
              <h1 className="text-2xl">Post Section is empty</h1>
            ) : (
              <Postcards post={arr} />
            )}
          </>
        )}
        {state === 2 && (
          <>
            {data2 && data2.length === 0 ? (
              <h1 className="text-2xl">Saved Section is empty</h1>
            ) : (
              <Postcards post={data2} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
