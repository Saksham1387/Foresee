import { AuthForm } from "@/components/AuthForm";
import { InternalHeader } from "@/components/InternalHeader";

export default function SignUp() {
  return (
    <div>
      <InternalHeader />
      <AuthForm type="signup" />
    </div>
  );
}
