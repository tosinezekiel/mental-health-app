"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { registerFormSchema } from "../schemas/formSchema";
import { useForm } from "../hooks/useForm";
import { useFormValidation } from "../hooks/useFormValidation";
import { IRegisterFormValues } from "~/types/formTypes";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";


const Form = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();
  const userCreator = api.user.create.useMutation()

  const { formData, handleChange } = useForm<IRegisterFormValues>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    retypePassword: "",
  }, (name) => {
    clearValidationError(name);
  });

  const { validationErrors, validate, clearValidationErrors, clearValidationError } =
    useFormValidation<IRegisterFormValues>(registerFormSchema);

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
      userCreator.mutate(formData, {
        onSuccess: async (createdUser) => {
          const { email, password } = formData;
          const authenticate = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (authenticate?.error) {
            throw new Error(authenticate.error);
          }

          session?.user.role == "ADMIN"
            ? router.push("/auth/admin")
            : router.push("/auth/patient");
        },
        onError: (error) => {
          throw new Error(`Error creating user: ${error.message}`);
        },
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
    <>
      <div className="mt-20 flex w-1/2 flex-col items-end justify-center px-10">
        <h2 className="text-3xl font-semibold text-blue-600 ">Register</h2>
        <h2 className="text-xl font-semibold text-gray-700">
          Let's set you up quickly <span className="icon-placeholder">😃</span>
        </h2>
        <p className="text-xs text-gray-500">
          Sign up to begin your evaluation journey.
        </p>
      </div>
      <div className="mt-20 w-1/2 flex-1 items-center py-20">
        {validationErrors.length && (
          <div className="border-l-4 border-red-400 bg-red-50 p-4">
            <div className="ml-3">
              {Object.entries(validationErrors).map(([field, message]) => (
                <p className="text-xs text-red-700" key={field}>
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            size="md"
            type="text"
            label="First name"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            variant="underlined"
            isInvalid={
              validationErrors.hasOwnProperty("firstName") ? true : false
            }
            errorMessage={
              validationErrors.hasOwnProperty("firstName") &&
              validationErrors.firstName.message
            }
            onChange={handleChange}
            className="no-border"
          />
          <Input
            size="md"
            type="text"
            name="lastName"
            label="Last name"
            placeholder="Doe"
            value={formData.lastName}
            variant="underlined"
            isInvalid={
              validationErrors.hasOwnProperty("lastName") ? true : false
            }
            errorMessage={
              validationErrors.hasOwnProperty("lastName") &&
              validationErrors.lastName.message
            }
            onChange={handleChange}
            className="no-border"
          />
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
          <Input
            size="md"
            type="password"
            name="retypePassword"
            label="Retype Password"
            placeholder="Retype your password"
            variant="underlined"
            value={formData.retypePassword}
            isInvalid={
              validationErrors.hasOwnProperty("retypePassword") ? true : false
            }
            errorMessage={
              validationErrors.hasOwnProperty("retypePassword") &&
              validationErrors.retypePassword.message
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
