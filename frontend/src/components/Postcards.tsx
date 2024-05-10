import Poststats from './Poststats'

  const Postcards = (props:any ) => {
    const post= props.post
    const id =localStorage.getItem("userId") 
   let val:number;
if (id) {
    val = parseInt(id); 
}

console.log("postcard " ,post)
  return (
    <div>
          {post && post.map((item:any,index:any)=> (
          <li key={index} className="p-2 pl-3 mb-3 border-2">
            <div className='h-[100%] w-[100%] flex justify-between'>
            <div className="flex flex-row w-[100%] h-[100%]">
              <div className="flex flex-row  w-[17%] h-[40%]">
                <img src={item?.userimage} className="w-[10rem] h-[9.5rem] rounded-full " alt="Profile" />
              </div>
              <div className="flex flex-col ml-2 pt-3">
                <p className='text-3xl'>{item?.username}</p>
                <p className='text-xl'> {item?.location}</p>
              </div>
            </div>
            { item.userId === val  &&
            <div className='mr-5 mt-1 h-[100%] text-2xl font-bold'>
            Edit
            </div>
  }
            </div>
            <div className="flex flex-col w-[100%] h-[60%]">
              <div>{item?.caption}</div>
              <div>{item?.tags}</div>
              <img src= {item?.imageUrl} className='h-[45rem] w-[48rem] rounded-lg' />
            </div>
  
            <Poststats info={item} />
          </li>
  ))}
    </div>
  )
}
export default Postcards
