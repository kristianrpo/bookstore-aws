import { Metadata } from "next";
import AddBookForm from "@/app/components/forms/AddBookForm"; 

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for the bookstore application",
};

export default function AddBook() {
  return (
    <div className="container mt-4">
      <h2>Add New Book</h2>
      <AddBookForm />
    </div>
  );
}
