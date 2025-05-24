"use client";
import { Eye, User, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { API_URL } from "@/lib/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const InternalHeader = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data.data);
    };
    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, []);
  return (
    <header className=" text-black shadow-md w-full">
      <div className="h-16 flex items-center justify-between px-10">
        <Link href="/">
          <div className="flex items-center gap-1 cursor-pointer">
            <Eye />
            <span className="text-2xl font-semibold hidden sm:block">
              Foresee
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="cursor-pointer text-md relative group">
            <span className="relative">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="/event" className="cursor-pointer text-md relative group">
            <span className="relative">
              Trade
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </nav>

        {user && (
          <div className="flex items-center space-x-6">
            <div className="flex flex-row items-center gap-2  p-2 rounded-xl">
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-semibold">{user.balance}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <div className="relative flex items-center gap-2 bg-gray-200 p-2 rounded-full">
                  <User />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-none">
                <DropdownMenuGroup>
                  <DropdownMenuItem> {user.username}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  onClick={() => {
                    localStorage.setItem("token", "");
                    setUser(null);
                  }}
                  className="cursor-pointer hover:bg-gray-200 "
                >
                  Log out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {!user && (
          <nav className="hidden md:flex items-center space-x-6 bg-black text-white p-3 rounded-xl hover:bg-black/70 text-sm">
            <Link href={"/auth/signin"}>Log In</Link>
          </nav>
        )}
      </div>
    </header>
  );
};
