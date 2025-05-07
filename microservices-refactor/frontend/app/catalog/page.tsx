import { Metadata } from "next";
import Image from "next/image";
import axios from "axios";
import ROUTES_API from "@/constants/api.urls";
import { cookies } from 'next/headers'; 

export const metadata: Metadata = {
  title: "Catalog",
  description: "Catalog page for the bookstore application",
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

interface BookResponse {
    books: Book[];
}


export default async function Catalog() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get('session');
  

  const response = await axios.get<BookResponse>(
    ROUTES_API.BOOK.CATALOG,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `session=${sessionCookie?.value}`,
      },
      withCredentials: true,
    }
  );

  const books = response.data["books"]
  console.log(books);

  return (
    <div className="container mt-4">
      <h2>Book Catalog</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book: Book) => (
          <div className="col" key={book.id}>
            <div className="card h-100">
              <div style={{ position: 'relative', height: '200px' }}>
                  <Image
                    src="/book.jpg"
                    alt="Default book image"
                    fill
                    style={{ objectFit: "cover" }}
                  />
              </div>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">{book.description}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price.toFixed(2)}</p>
                <p className="card-text"><strong>Stock:</strong> {book.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
