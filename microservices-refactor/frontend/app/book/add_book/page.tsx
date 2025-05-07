import { Metadata } from "next";
import AddBookForm from "@/app/components/forms/AddBookForm"; 
import { cookies } from 'next/headers';
export const metadata: Metadata = {
  title: "Login",
  description: "Login page for the bookstore application",
};

export default async function AddBook() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');

  if (!sessionCookie) {
    return (
      <div className="container mt-4">
        <h2>Unauthorized</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }
  
  return (
    <div className="container mt-4">
      <h2>Add New Book</h2>
      <AddBookForm />
    </div>
  );
}
