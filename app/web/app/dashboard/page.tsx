"use client";

import { useMe } from "@/services/api/auth/auth.api";

const DashboardPage = () => {
  const { data, isLoading, isError, error } = useMe();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching user:{error}</p>;
  return (
    <div>
      DashboardPage
      <p>Id:{data?.id}</p>
      <p>Name:{data?.name}</p>
      <p>Email:{data?.email}</p>
      <p>Pic:{data?.profilePicUrl}</p>
      <p>Created at:{data?.createdAt}</p>
    </div>
  );
};

export default DashboardPage;
