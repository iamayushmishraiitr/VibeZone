
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import PostUploader from "@/components/PostUploader";
import { useState, useEffect } from "react";
import axios from "axios";
const PostValidation = z.object({
  Bio: z.string(),
  file: z.custom<File[]>(),
});
type Data = {
  bio:string,
  email: string ,
  id :number ,
  image:string ,
  saved :string[] ,
  username: string
};
export default function EditProfile() {

  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [data, setData] = useState<Data | null>(null);
  const defaultBio = data?.bio;
  useEffect(() => {
    axios
      .get("http://localhost:3000/editprofile", {
        params: { id: localStorage.getItem("userId") },
      })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),

  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
  
    try {
      const res = await axios.put("http://localhost:3000/editprofile", {
        values, imgUrl ,id:localStorage.getItem('userId')
      });
      alert("Updated successfully")
    } catch (error) {
      alert("data could not be Edited");
    }
  }

  const handleDataFromChild = (data: string[]) => {
    setImgUrl(data);
  };
console.log("Edit Profile   ",data)
  return (
    <div className="text-white bg-black w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem > 
                <FormLabel>Add Picture</FormLabel>
                <FormControl>
                  <PostUploader
                    fieldChange={field.onChange}
                    imgaeToparent={handleDataFromChild}
                    imageurl={data && data.image}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-[600px] h-[80px] md:w-99 text-black"
                    {...field}
                    defaultValue={defaultBio}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <div className=" flex gap-2 ">
            <Button className="bg-purple-400" type="submit">
              Submit
            </Button>
            <Button type="submit">Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
