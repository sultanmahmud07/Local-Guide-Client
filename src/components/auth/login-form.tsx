"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

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
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="bg-white rounded-xs"
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="">
          <Field>
            <Button type="submit" className="rounded-xs cursor-pointer" disabled={isPending}>
              {isPending ? "Logging in..." : "Login Now"}
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
