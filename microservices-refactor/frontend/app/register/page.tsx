import { Metadata } from "next";
import RegisterForm from "@/app/components/forms/RegisterForm"; 

export const metadata: Metadata = {
  title: "Register",
  description: "Register page for the bookstore application",
};

export default function Register() {
  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
}
