"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { registerFormSchema } from "../schemas/formSchema";
import { FormErrors } from "~/types/formTypes";

const Form = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setValidationErrors({});
    setIsLoading(true);

    const formData = { email, password, retypePassword, firstName, lastName };
    const validation = registerFormSchema.safeParse(formData);

    if (!validation.success) {
      const newErrors: FormErrors = {};
      validation.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") {
          newErrors[key] = issue.message;
        } else {
          console.error("Unexpected issue path:", issue.path);
        }
      });

      setValidationErrors(newErrors);
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
      
      const authenticate = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (authenticate?.error) {
        throw new Error(authenticate.error);
      } else {
        // Redirect to main dashboard
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
    <>
      <div className="mt-20 flex w-1/2 flex-col items-end justify-center">
        <h2 className="text-3xl font-semibold text-blue-600 ">Register</h2>
        <h2 className="text-xl font-semibold text-gray-700">
          Let's set you up quickly <span className="icon-placeholder">😃</span>
        </h2>
        <p className="text-xs text-gray-500">
          Sign up to begin your evaluation journey.
        </p>
      </div>
      <div className="mt-20 w-1/2 items-center p-10">
        {validationErrors.length && (
          <div className="border-l-4 border-red-400 bg-red-50 p-4">
            <div className="ml-3">
              {Object.entries(validationErrors).map(([field, message]) => (
                <p className="text-xs text-red-700" key={field}>
                  {message}
                </p>
              ))}
            </div>
          </div>
        )}
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
        <div className="mt-2 flex">
          <p className="text-xs">
            Already have an account?
            <span className="ml-1 text-blue-600">
              <Link href="/login">Please login</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
