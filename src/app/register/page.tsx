"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { z } from "zod";

const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    retypePassword: z.string(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = { email, password, retypePassword, firstName, lastName };
    const validation = userSchema.safeParse(formData);

    if (!validation.success) {
      setError(JSON.stringify(validation.error.flatten().fieldErrors));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          retypePassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("User created successfully", data);
      const authenticate = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

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
        <h2 className="text-3xl font-semibold text-blue-600 ">Register</h2>
        <h2 className="text-xl font-semibold text-gray-700">
          Let's set you up quickly <span className="icon-placeholder">😃</span>
        </h2>
        <p className="text-gray-500 text-xs">Sign up to begin your evaluation journey.</p>
      </div>
      <div className="mt-20 w-1/2 items-center p-10">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            size="sm"
            type="text"
            label="First name"
            placeholder="John"
            value={firstName}
            variant="underlined"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            size="sm"
            type="text"
            label="Last name"
            placeholder="Doe"
            value={lastName}
            variant="underlined"
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <Input
            size="sm"
            type="password"
            label="Retype Password"
            placeholder="Retype your password"
            variant="underlined"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          {isLoading && (
            <Button color="primary" isLoading size="sm">
              Loading
            </Button>
          )}
          {!isLoading && (
            <Button color="primary" size="sm" type="submit" radius="none">
              Submit
            </Button>
          )}
        </form>
        <div className="flex mt-2">
          <p className="text-xs">
            Already have an account?
            <span className="text-blue-600 ml-1">
              <Link href="/">Please login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
