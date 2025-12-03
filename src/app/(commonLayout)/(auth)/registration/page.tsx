
import RegisterForm from "@/components/auth/register-form";
import Image from "next/image";

const GuideRegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 py-10">
         <div className="grid grid-cols-1 md:grid-cols-2 bg-secondary/10 w-full main-container rounded md:rounded-lg shadow-lg overflow-hidden ">
           <div className="left-image w-full">
             <Image
               src="/auth/register.jpg"
               alt="Description of image"
               width={400}
               height={400}
               className="w-full h-full object-cover"
             />
           </div>
           <div className="w-full p-5 md:px-16">
             <h1 className="text2xl md:text-3xl py-4  font-bold capitalize font-oswald">Create an<br></br> account to book</h1>
             <p className="text-gray-500 mb-3">
              Enter your credentials to access your account
            </p>
             <RegisterForm />
           </div>
         </div>
       </div>
  );
};

export default GuideRegisterPage;
