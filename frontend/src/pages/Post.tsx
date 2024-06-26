 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form ,FormControl ,FormField ,  FormItem,FormLabel, FormMessage} from "@/components/ui/form"
 import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PostUploader from "@/components/PostUploader"
import { useState } from "react"
import axios from "axios"
import Loader from "@/components/Loader"
const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string()   ,
  tags: z.string(),
});

export default function Post() {

  const [imgUrl, setImgUrl] = useState<string[]>([]);
 const [loader,setLoader] =   useState(false) 
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation)
  })
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    setLoader(true)
      try {
        const res= await axios.post("http://localhost:3000/post",{
         imageUrl: imgUrl ,
         tags :values.tags ,
         location : values.location ,
         caption: values.caption ,
         userId :  localStorage.getItem('userId')
      })
      console.log("values" ,values)
      setLoader(true)
        if(res) alert("posted Succesfully")
          window.location.reload()
       } 

       catch (error) {
         console.log(error)
         setLoader(true)
         alert("Could Not Post ")
         window.location.reload()
      }
  }
  const handleDataFromChild= (data:string[])=>{
       setImgUrl(data)
  }

  return (
    <div className="h-[100vh] w-[100vw] pl-3 bg-slate-900 text-white">
    {loader ? ( 
       <div className="w-[74%]"> <Loader /> </div>
    ) : (
    <div className="text-white bg-black w-full ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
      <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem >
              <FormLabel >Add Picture</FormLabel>
              < FormControl>
              <PostUploader
                  fieldChange={field.onChange} 
                  imgaeToparent={handleDataFromChild} 
                  imageurl={null}
              />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
      <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem >
              <FormLabel >Caption</FormLabel>
              <FormControl className="w-1000" >
                <Textarea className="w-[600px] md:w-99 text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
         <FormField 
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem >
              <FormLabel >Add Tags</FormLabel>
              <FormControl>
              <Textarea className="w-[600px] h-[50px] md:w-99 text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem >
              <FormLabel >Add Location</FormLabel>
              <FormControl>
             <Input type="text" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className=" flex gap-2 ml-[900px]">
        <Button className ="bg-purple-400" type="submit">Submit</Button>
        <Button type="submit">Cancel</Button>
        </div>
      </form>
    </Form>
    </div>
   )}
   </div>
  )

}
