"use client";

import Image from "next/image";
import { signOut } from "@/lib/auth";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  const logout = () => {
    signOut().then(() => {
      return router.push("/");
    });
  };

  return (
    <div className="lg:hidden h-14 bg-primary w-full px-4 flex justify-between items-center">
      <div className="flex items-center h-12 w-12 relative">
        <Image
          src="/images/abs_logo.svg"
          alt="logo"
          fill
          className="brightness-0 invert"
        />
      </div>
      <Button
        color="default"
        onClick={logout}
        className={`uppercase text-white text-left flex items-center   hover:bg-black `}
      >
        <Image
          src="/icons/signout_white.svg"
          alt="signout"
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
}
