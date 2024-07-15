import Loader from '@/components/Loader'
import Postcards from '@/components/Postcards'
import TopCreators from '@/components/TopCreators'
import axios from 'axios'
import  { useEffect ,useState } from 'react'

const Likes = () => {
  const [data,setData]=useState<any|null>(null)
  const [loader,setLoader]=useState(true) 
  useEffect(()=>{
    axios.get('http://localhost:3000/likedPost' ,{
      params:{id:localStorage.getItem('userId')}
    }) 
        .then((res)=>setData(res.data))
        .catch((error)=>console.log(error))
        setLoader(false)
  },[])  

  return (
    <div className='flex h-[100vh] w-[100%] text-white'>
    <div className='bg-slate-800  h-[100%] w-[66%] overflow-auto'>
    {
  loader ? <Loader/> : 
   data && data.length === 0 ? <p>No Post Has Been Liked </p> : 
    <Postcards post={data} /> 
  
}

    </div>
    <div className=" w-[34%] pl-3 bg-black">
       <TopCreators/>
      </div>
    </div>
  )
}

export default Likes