"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";
import { loginFormSchema } from "../schemas/formSchema";
import { ILoginFormValues } from "~/types/formTypes";
import { useForm } from "../hooks/useForm";
import { useFormValidation } from "../hooks/useFormValidation";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { validationErrors, validate, clearValidationErrors, clearValidationError } =
    useFormValidation<ILoginFormValues>(loginFormSchema);

    const { formData, handleChange } = useForm<ILoginFormValues>({
      email: "",
      password: "",
    }, (name) => {
      clearValidationError(name);
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    clearValidationErrors();
    setIsLoading(true);

    if (!validate(formData)) {
      setIsLoading(false);
      return;
    }

    try {
      const { email, password } = formData;
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      const session  = await getSession();

      session?.user.role == "ADMIN" ? router.push('/auth/admin') : router.push('/auth/patient');
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-20 flex w-1/2 flex-col items-end justify-center px-10">
        <h2 className="text-3xl font-semibold text-blue-600 ">Login</h2>
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome back <i className="icon-placeholder">👋</i>
        </h2>
        <p className="text-xs text-gray-500">We are glad to have you back!</p>
      </div>
      <div className="mt-20 w-1/2 items-center py-20 flex-1">
        {error && (
          <div className="border-l-4 border-red-400 bg-red-50 p-4">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error} </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            size="md"
            type="email"
            label="Email"
            placeholder="Enter your email"
            variant="underlined"
            value={formData.email}
            name="email"
            isInvalid={validationErrors.hasOwnProperty("email") ? true : false}
            errorMessage={
              validationErrors.hasOwnProperty("email") &&
              validationErrors.email.message
            }
            onChange={handleChange}
            className="no-border"
          />
          <Input
            size="md"
            type="password"
            label="Password"
            variant="underlined"
            value={formData.password}
            name="password"
            placeholder="Enter your password"
            isInvalid={
              validationErrors.hasOwnProperty("password") ? true : false
            }
            errorMessage={
              validationErrors.hasOwnProperty("password") &&
              validationErrors.password.message
            }
            onChange={handleChange}
            className="no-border"
          />
          {isLoading && (
            <Button color="primary" isLoading size="md" radius="sm">
              Loading
            </Button>
          )}
          {!isLoading && (
            <Button color="primary" size="md" type="submit" radius="sm">
              Submit
            </Button>
          )}
        </form>
        <div className="mt-2 flex">
          <p className="text-xs">
            Don't have an account yet?
            <span className="ml-1 text-blue-600">
              <Link href="/register">Create one here</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
