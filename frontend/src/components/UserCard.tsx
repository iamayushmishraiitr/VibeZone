import { Link } from "react-router-dom";
import Followers from "./Followers";

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

const UserCard = ({user}:{user:User}) => {
  return (
    <div className='flex flex-col'>
    <Link to={`/people/${user.id}`} >
      
    <img
      src={user?.userimage===""? "../src/assets/fileupload.svg" : user?.userimage}
      alt="creator"
      className="rounded-full w-[60px] h-[60px]"
    />

    <div className="flex-center flex-col ">
      <p className="text-xl">
        {user.username}
      </p>
      <p className="text-xl text-slate-500 mt-3">
        @{user.username}
      </p>
    </div>
  </Link>
    <Followers  user={user}/>
    </div>
  )
}

export default UserCard