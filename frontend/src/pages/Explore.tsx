import ExploreUser from "@/components/ExploreUser";
import Loader from "@/components/Loader";
import TopCreators from "@/components/TopCreators";
import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Explore = () => {
  const [data, setData] = useState<string[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:3000/followrequest", {
        params: { id: localStorage.getItem("userId") },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    setLoader(false);
  }, []);
  const data2 = data && data.map((item) => JSON.parse(item));
  
  return (
    <div className="h-[100vh] w-[100vw] pl-3 bg-slate-900 text-white">
      {loader ? (
        <div className="w-[74%]">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div className="h-[100vh] w-[100%] flex">
          <ul className="flex flex-col w-[60%] gap-9">
            <p>Explore Section</p>
            <div className="w-[100%] h-[100vh] flex flex-col border  overflow-auto scrollbar-hide">
              {data2 &&
                data2.map((item: any, index: any) => (
                  <li
                    key={index}
                    className="w-[90%]  h-[10rem] mt-2 mb-8 ml-10 bg-black  rounded-lg"
                  >
                    <div className="h-[100%] flex flex-row  ">
                        <ExploreUser item={item}/>
                    </div>
                  </li>
                ))}
            </div>
          </ul>
          <div className="w-[40%] pl-3 bg-black">
            <TopCreators />
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
