import { Metadata } from "next";
import LoginForm from "@/app/components/forms/LoginForm"; 

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for the bookstore application",
};

export default function Login() {
  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
}
