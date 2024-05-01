"use client";

import { api } from "~/trpc/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function Users() {
  const { data: users, isLoading, isError } = api.user.getUsers.useQuery();

  console.log(users);

  if (isLoading) return <Spinner />;
  if (isError || !users)
    return (
      <div className="border-l-4 border-red-400 bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error loading users</p>
          </div>
        </div>
      </div>
    );

  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>FIRST NAME</TableColumn>
        <TableColumn>LAST NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>DATE JOINED</TableColumn>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
