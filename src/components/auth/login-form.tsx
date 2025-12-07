"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  const handleGoogleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`)
  }
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
            />

            <InputFieldError field="email" state={state} />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-white rounded-xs pr-10"
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
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10  px-2 ">
                Or continue with
              </span>
            </div>

            {/*//* http://localhost:5000/api/v1/auth/google */}
            <Button
              onClick={() => handleGoogleLogin()}
              type="button"
              variant="outline"
              className="w-full cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FcGoogle /> Login with Google
            </Button>
            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary  hover:underline hover:font-semibold">
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
