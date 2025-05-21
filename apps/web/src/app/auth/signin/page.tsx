import { AuthForm } from "@/components/AuthForm";
import { InternalHeader } from "@/components/InternalHeader";

export default function SignIn() {
  return (
    <div>
      <InternalHeader />
      <AuthForm type="signin" />
    </div>
  );
}
