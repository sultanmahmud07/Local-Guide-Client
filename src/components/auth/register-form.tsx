"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { registerUser } from "@/services/auth/registerUser";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      {/* we pass role=TOURIST as hidden field */}
      <input type="hidden" name="role" value="TOURIST" />
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name"
              className="bg-white rounded-xs" name="name" type="text" placeholder="John Doe" />
            <InputFieldError field="name" state={state} />
          </Field>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              className="bg-white rounded-xs"
            />
            <InputFieldError field="email" state={state} />
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="number"
              placeholder="+8801******"
              className="bg-white rounded-xs"
            />
            <InputFieldError field="phone" state={state} />
          </Field>
          {/* Address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St"
              className="bg-white rounded-xs"
            />
            <InputFieldError field="address" state={state} />
          </Field>
          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password"
              className="bg-white rounded-xs" name="password" type="password" />

            <InputFieldError field="password" state={state} />
          </Field>
          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="bg-white rounded-xs"
            />

            <InputFieldError field="confirmPassword" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-2">
          <Field>
            <Button type="submit" className="rounded-xs cursor-pointer" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-secondary hover:font-semibold hover:underline">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
