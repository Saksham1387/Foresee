"use client";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/lib/config";
import { toast } from "sonner";

interface AuthFormProps {
  type: string;
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (type === "signin") {
        // Sign in logic
        const res = await axios.post(`${API_URL}/signin`, {
          email,
          password,
        });
        
        const resData = res.data;
        if (resData.success) {
          localStorage.setItem("token", resData.data);
          toast("Signed in successfully");
          router.push("/");
          return;
        }
        toast("Failed to sign in");
      } else if (type === "signup") {
        // Sign up logic
        const res = await axios.post(`${API_URL}/signup`, {
          username,
          email,
          password,
        });
        
        if (res.data.success) {
          toast("Signed up successfully. You can now sign in");
          router.push("/auth/signin");
          return;
        }
        toast("Failed to sign up");
      }
    } catch (err) {
      console.log(err);
      toast(`Failed to ${type === "signin" ? "sign in" : "sign up"}`);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 pt-32">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <div className="items-center justify-center flex">
          <Eye className="text-3xl" />
        </div>

        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {type === "signin"
            ? "Sign in to your account"
            : "Sign up to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {type === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-green-800  ">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white shadow-xs cursor-pointer"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="#" className="font-semibold text-green-800 ">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};