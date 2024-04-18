"use client";

import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input, Button } from "@nextui-org/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError("");
    event.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      } else {
        // Redirect to either dashboard or admin page based on user role
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex max-w-4xl justify-center">
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
              <p className="text-sm text-red-700">{ error } </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            size="sm"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            variant="underlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            size="sm"
            type="password"
            label="Password"
            variant="underlined"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default Login;
