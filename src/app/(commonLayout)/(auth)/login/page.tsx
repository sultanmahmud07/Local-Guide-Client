import LoginForm from "@/components/auth/login-form";
import Image from "next/image";


const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  // console.log(params.redirect)
  return (
   <> 
    <div className="min-h-screen flex items-center justify-center pt-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-primary/10 w-full main-container rounded md:rounded-lg shadow-lg overflow-hidden ">
        <div className="left-image w-full">
          <Image
            src="/auth/login.jpg"
            alt="Description of image"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full p-5 md:px-20">
          <div className="space-y-2 text-center">
            <h1 className="text2xl md:text-3xl font-bold capitalize font-oswald">Traveler login to book</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm redirect={params.redirect} />
        </div>
      </div>
    </div>
   </>
  );
};

export default LoginPage;
