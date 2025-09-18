import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  console.log("Session in Navbar:", session);
  return (
    <header className="bg-white shadow-md p-4">
      <nav className="text-black justify-between flex items-center">
        <Link href="/" className="mr-4">
          <Image src="/logo.png" alt="Logo" width={144} height={30} />
        </Link>
        <div className="flex items-center space-x-4 font-medium">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="">
                <span  className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden"/>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="text-red-500"> <span className="max-sm:hidden">Logout</span> <span className="size-6 sm:hidden"> <LogOut/> </span> </button>
              </form>
              <Link href={`/user/${session?.user?.id}`} className="">
                <Avatar className="size-10">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
