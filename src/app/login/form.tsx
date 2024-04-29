"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
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
  const { data: session } = useSession();

  const { formData, handleChange } = useForm<ILoginFormValues>({
    email: "",
    password: "",
  });

  const { validationErrors, validate, clearValidationErrors } =
    useFormValidation<ILoginFormValues>(loginFormSchema);

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
        password,
        // callbackUrl: 'http://localhost:3000/auth/patient' 
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      const session = await getSession();
      console.log(session);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const url: string = (session.user.role === 'ADMIN') ? '/auth/admin' : '/auth/patient';
      router.push(url);
    }
  }, [session, router]);

  return (
    <>
      <div className="mt-20 flex w-1/2 flex-col items-end justify-center">
        <h2 className="text-3xl font-semibold text-blue-600 ">Login</h2>
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome back <i className="icon-placeholder">👋</i>
        </h2>
        <p className="text-xs text-gray-500">We are glad to have you back!</p>
      </div>
      <div className="mt-20 w-1/2 items-center p-10">
        {error && (
          <div className="border-l-4 border-red-400 bg-red-50 p-4">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error} </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            size="sm"
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
          />
          <Input
            size="sm"
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
          />
          {isLoading && (
            <Button color="primary" isLoading size="sm" radius="none">
              Loading
            </Button>
          )}
          {!isLoading && (
            <Button color="primary" size="sm" type="submit" radius="none">
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
