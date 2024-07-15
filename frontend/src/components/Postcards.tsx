import Poststats from './Poststats'

  const Postcards = (props:any ) => {
    const post= props.post
    const id =localStorage.getItem("userId") 
   let val:number;
if (id) {
    val = parseInt(id); 
}

  return (
    <div className='h-[100%] w-[100%]'>
          {post && post.map((item:any,index:any)=> (
          <li key={index} className="p-2 pl-3 mb-3 border-t-2 ">
            <div className=' flex justify-between'>
            <div className="flex flex-row w-[100%] h-[100%]">
              <div className="flex flex-row  w-[140px] h-[140px]">
                <img src={item?.userimage==="" ?"../src/assets/fileupload.svg" :item?.userimage} className="w-[full] h-[full] rounded-full " alt="Profile" />
              </div>
              <div className="flex flex-col ml-5 pt-3">
                <p className='text-3xl mb-1.5'>{item?.username}</p>
                <p className='text-xl'> {item?.location}</p>
              </div>
            </div>
            {/* { item.userId === val  &&
            <div className='mr-5 mt-1 h-[100%] text-2xl font-bold'>
            Edit
            </div>
  } */}
            </div>
            <div className="flex flex-col w-[90%] h-[50%] gap-1 mt-1 ">
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
