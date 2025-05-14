import { Metadata } from "next";
import axios from "axios";
import { cookies } from 'next/headers'; 
import Link from "next/link";
import ROUTES from "@/constants/urls";
import DeleteButton from "@/app/components/buttons/DeleteButton";

export const metadata: Metadata = {
  title: "My Books",
  description: "My books page for the bookstore application",
};

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    image_path: string;
}


export default async function MyBooks() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');
  let books: Book[] = [];

  if (!sessionCookie) {
    return (
      <div className="container mt-4">
        <h2>Unauthorized</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  try {
    const response = await axios.get<Book[]>(
      `https://www.telematics-projects.space/objective-3/api/book/my-books`,
      {
        headers: {
          Cookie: `session=${sessionCookie?.value}`,
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      books = response.data;
    }
  } catch {
    books = [];
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My books</h2>

      {books.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>{book.stock}</td>
                <td>
                  <Link href={`${ROUTES.EDIT_BOOK}/${book.id}`} className="btn btn-sm btn-warning">Edit</Link>
                  
                  <DeleteButton 
                    bookId={book.id} 
                  ></DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You don&apos;t have books yet</p>
      )}

      <div className="mt-4">
        <Link href={ROUTES.ADD_BOOK} className="btn btn-primary">Add new book</Link>
        <Link href={ROUTES.CATALOG} className="btn btn-secondary">Return to catalog</Link>
      </div>
    </div>
  );
}
