"use client";

import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

// Component
import { Sider } from "@/components/Sider";
import { Navbar } from "@/components/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [router, user, isLoading]);

  return (
    <div className="flex w-full lg:flex-row flex-col lg:max-h-screen lg:overflow-hidden">
      <Navbar />
      <Sider />
      {children}
    </div>
  );
}
