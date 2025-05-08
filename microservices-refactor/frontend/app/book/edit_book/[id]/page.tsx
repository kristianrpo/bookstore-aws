import { Metadata } from "next";
import axios from "axios";
import ROUTES_API from "@/constants/api.urls";
import EditBookForm from "@/app/components/forms/EditBookForm";
import { cookies } from 'next/headers'; 


interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Book",
  description: "Edit book page for the bookstore application",
};

export default async function EditBook({ params }: Props) {
  const pathParams = await params;
  const id = pathParams.id;
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

  const book = await axios.post(
    ROUTES_API.BOOK.BOOK(id),
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      withCredentials: true,
    }
  );

  const user = await axios.get(
    ROUTES_API.AUTH.GET_USER,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      withCredentials: true,
    }
  );

  if (book.data.seller_id !== user.data.id) {
    return (
      <div className="container mt-4">
        <h2>Unauthorized</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Edit book</h2>
      <EditBookForm id={id} book={book.data}/>
    </div>
  );
}
