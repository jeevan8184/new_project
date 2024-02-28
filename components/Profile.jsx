
import PromptCard from "./PromptCard"

const Profile = ({name ,desc ,data ,handleEdit ,handleDelete}) => {
  return (
    <section className="w-full m-auto relative gap-2 flex-center flex-col">
       <h1 className="gap-2">
         <span className=" text-4xl font-bold text-blue-400">{name} profile</span>
       </h1>
       <p className=" text-gray-700 ">{desc}</p>
       
       <div className="mt-16 prompt_layout flex flex-col max-w-xl">
      {data.map((post)=> (
        <PromptCard 
        key={post._id}
        post={post}
        handleEdit={()=>handleEdit && handleEdit(post)}
        handleDelete={()=>handleDelete && handleDelete(post)}
        />
      ))}
    </div>
    </section>
  )
}

export default Profile