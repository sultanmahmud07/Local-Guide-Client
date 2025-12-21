"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { User, Map } from "lucide-react"; // or import from react-icons

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState(false);

  // --- NEW: State to control inputs for Demo buttons ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  // --- NEW: Helper to fill credentials ---
  const fillDemoCredentials = (role: 'tourist' | 'guide') => {
    if (role === 'tourist') {
      setEmail("tourist@gmail.com"); // Replace with your actual demo email
      setPassword("T@12345678");           // Replace with your actual demo password
    } else {
      setEmail("guide@gmail.com");   // Replace with your actual demo email
      setPassword("G@11111111");           // Replace with your actual demo password
    }
    toast.info(`${role === 'tourist' ? 'Tourist' : 'Guide'} credentials filled! please click Login Now.`);
  };

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tourist@example.com"
              className="bg-white rounded-xs"
              // --- NEW: Bind value and onChange ---
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-white rounded-xs pr-10"
                // --- NEW: Bind value and onChange ---
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        <FieldGroup className="">
          <Field>
            <Button type="submit" className="rounded-xs cursor-pointer" disabled={isPending}>
              {isPending ? "Logging in..." : "Login Now"}
            </Button>

            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 px-2 bg-white">
                Or continue with
              </span>
            </div> */}
            {/*//* http://localhost:5000/api/v1/auth/google */}
            {/* <Button
              onClick={() => handleGoogleLogin()}
              type="button"
              variant="outline"
              className="w-full cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FcGoogle /> Login with Google
            </Button> */}

            {/* --- NEW: Modern Demo Buttons --- */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 px-4 bg-white rounded-full ">
                Quick Demo Login
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 my-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer shadow h-11 border-emerald-100 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 flex items-center gap-2 justify-center"
                onClick={() => fillDemoCredentials('tourist')}
              >
                <User className="w-4 h-4" />
                <span className="font-semibold">Tourist</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="cursor-pointer shadow h-11 border-blue-100 bg-blue-50/50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex items-center gap-2 justify-center"
                onClick={() => fillDemoCredentials('guide')}
              >
                <Map className="w-4 h-4" />
                <span className="font-semibold">Guide</span>
              </Button>
            </div>
            <FieldDescription className="px-6 text-center pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline hover:font-semibold">
                Sign up
              </Link>
            </FieldDescription>
            <FieldDescription className="text-center">
              <Link
                href="/forget-password"
                className="text-primary hover:underline hover:font-semibold"
              >
                Forgot password?
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;