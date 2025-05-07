import { Metadata } from "next";
import axios from "axios";
import ROUTES_API from "@/constants/api.urls";
import EditBookForm from "@/app/components/forms/EditBookForm";
import { cookies } from 'next/headers'; 

export const metadata: Metadata = {
  title: "Edit Book",
  description: "Edit book page for the bookstore application",
};

export default async function EditBook({ params }: { params: { id: string } }) {
  const { id } = await params;
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');
  

  const book = await axios.post(
    ROUTES_API.BOOK.GET_BOOK(id),
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      withCredentials: true,
    }
  );
  return (
    <div className="container mt-4">
      <h2>Edit book</h2>
      <EditBookForm id={id} book={book.data}/>
    </div>
  );
}
