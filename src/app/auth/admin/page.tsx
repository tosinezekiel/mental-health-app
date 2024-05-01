"use client";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import Users from "./components/users";
import Stats from "./components/stats";

export default function AdminDashboard() {
  return (
    <div className="">
      <Stats />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">Users</h3>
      <div className="max-w-7xl mt-4">
        <Users />
      </div>
    </div>
  );
}
