"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

type Props = {
  user: User | null;
};

function Page({ user }: Props) {
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return <h1>Only logged in users can view this page</h1>;
}

export default function WrappedPage() {
  const { user } = useAuthContext();
  return <Page user={user} />;
}
