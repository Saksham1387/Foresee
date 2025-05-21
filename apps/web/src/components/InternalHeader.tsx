import Link from "next/link";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
export const InternalHeader = () => {
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
          <Button variant="ghost" className="cursor-pointer">
            Home
          </Button>
          <Button variant="ghost" className="cursor-pointer">
            Trade
          </Button>
        </nav>

        <Button className="p-3 bg-black text-white">Login</Button>
      </div>
    </header>
  );
};
