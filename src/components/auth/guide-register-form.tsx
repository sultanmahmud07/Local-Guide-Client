// components/auth/register-form.tsx
"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "../shared/InputFieldError";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerUser } from "@/services/auth/registerUser";


const GuideRegisterForm = () => {
      const [state, formAction, isPending] = useActionState(registerUser, null);
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      useEffect(() => {
            if (state && !state.success && state.message) {
                  toast.error(state.message);
            }
            if (state && state.success && state.message) {
                  toast.success(state.message);
            }
      }, [state]);

      return (
            <form action={formAction} className="w-full">
                  {/* we pass role=GUIDE as hidden field */}
                  <input type="hidden" name="role" value="GUIDE" />

                  <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Name */}
                              <Field>
                                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                    <Input id="name" name="name" type="text" placeholder="John Doe" className="bg-white rounded-xs" />
                                    <InputFieldError field="name" state={state} />
                              </Field>

                              {/* Email */}
                              <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input id="email" name="email" type="email" placeholder="you@example.com" className="bg-white  rounded-xs" />
                                    <InputFieldError field="email" state={state} />
                              </Field>

                              {/* Phone */}
                              <Field>
                                    <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
                                    <Input id="phone" name="phone" type="tel" placeholder="+8801XXXXXXXXX" className="bg-white  rounded-xs" />
                                    <InputFieldError field="phone" state={state} />
                              </Field>

                              {/* Address */}
                              <Field>
                                    <FieldLabel htmlFor="address">Address (optional)</FieldLabel>
                                    <Input id="address" name="address" type="text" placeholder="City, Street" className="bg-white  rounded-xs" />
                                    <InputFieldError field="address" state={state} />
                              </Field>

                              {/* Password */}
                              {/* Password */}
                              <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                    <div className="relative">
                                          <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className="bg-white rounded-xs pr-10"
                                          />

                                          <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                          >
                                                {showPassword ? (
                                                      <AiOutlineEyeInvisible size={20} />
                                                ) : (
                                                      <AiOutlineEye size={20} />
                                                )}
                                          </button>
                                    </div>

                                    <InputFieldError field="password" state={state} />
                              </Field>


                              {/* Confirm Password */}
                              {/* Confirm Password */}
                              <Field>
                                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

                                    <div className="relative">
                                          <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="bg-white rounded-xs pr-10"
                                          />

                                          <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                          >
                                                {showConfirmPassword ? (
                                                      <AiOutlineEyeInvisible size={20} />
                                                ) : (
                                                      <AiOutlineEye size={20} />
                                                )}
                                          </button>
                                    </div>

                                    <InputFieldError field="confirmPassword" state={state} />
                              </Field>

                        </div>

                        <FieldGroup className="mt-4">
                              <Field>
                                    <Button type="submit" className="rounded-md" disabled={isPending}>
                                          {isPending ? "Creating account..." : "Create account"}
                                    </Button>

                                    <FieldDescription className="text-center mt-3">
                                          Already have an account?{" "}
                                          <Link href="/login" className="text-primary hover:font-semibold hover:underline">
                                                Sign in
                                          </Link>
                                    </FieldDescription>
                              </Field>
                        </FieldGroup>
                  </FieldGroup>
            </form>
      );
};

export default GuideRegisterForm;
