import axios from "axios";
import { useEffect, useState } from "react";

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

const Followers = ({ user }: { user: User }) => {
  const [user1, setUser1] = useState<User | null>(null);
  const [state, setState] = useState<number>(1); // Default state is 1 (Follow)

  useEffect(() => {
    axios
      .get("http://localhost:3000/editprofile", {
        params: { id: localStorage.getItem("userId") },
      })
      .then((res) => setUser1(res.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []); 

  useEffect(() => {
    if (user1) {
      const req = user1.request;
      const req2 = user1.following;
      const arr = req 
      const arr2 = req2 
      const find = arr && arr.find((item) => item === user.id.toString());
      const find2 = arr2 && arr2.find((item) => item === user.id.toString());

      if (find) setState(2); 
      if (find2) setState(3); 
    }
  }, [user1]);

  const request = async (user: User) => {
    try {
      if (state === 1) {
        setState(2);
        await axios.post("http://localhost:3000/followrequest", {
          id1: localStorage.getItem("userId"),
          id: user.id,
          username: user.username,
          image: user.userimage,
        });
      } else if (state === 2) {
        setState(1);
        await axios.delete("http://localhost:3000/followrequest", {
          data: {
            id1: localStorage.getItem("userId"),
            id: user.id,
            username: user.username,
            image: user.userimage,
          },
        });
      }
    } catch (err) {
      console.error("Error requesting follow:", err);
      alert("Error requesting follow. Please try again later.");
    }
  };

  return (
    <button
      onClick={() => request(user)}
      className="bg-purple-700 rounded-lg flex justify-center mt-2 items-center h-10 w-20"
    >
      {state === 1 ? (
        <span>Follow</span>
      ) : state === 2 ? (
        <span>Requested</span>
      ) : state === 3 ? (
        <span>Following</span>
      ) : null}
    </button>
  );
};

export default Followers;
