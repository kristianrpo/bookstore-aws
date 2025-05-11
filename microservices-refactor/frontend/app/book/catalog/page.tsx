import axios from "axios";
import { Metadata } from "next";
import { cookies } from "next/headers";
import PurchaseForm from "@/app/components/forms/PurchaseForm";

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

export default async function Catalog() {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session");
  let books: Book[] = [];

  try {
    const response = await axios.get<Book[]>(
      `${process.env.NEXT_PUBLIC_URL!}/api/book/catalog`,
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
    <div className="container mt-4">
      <h2>Book Catalog</h2>
      <br />
      <br />
      <br />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book: Book) => (
          <div className="col" key={book.id}>
            <div className="card h-100">
              <div style={{ position: 'relative', height: '200px' }}>
                {book.image_path ? (
                  <img
                    src={`/api/book/image/${book.image_path.split('/').pop()}`}
                    alt={book.title}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      display: 'block',
                    }}
                  />
                ) : (
                  <img
                    src="/images/book.jpg"
                    alt="Default book image"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      display: 'block',
                    }}
                  />
                )}
                
              </div>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">{book.description}</p>
                <p className="card-text"><strong>Price:</strong> ${book.price.toFixed(2)}</p>
                <p className="card-text"><strong>Stock:</strong> {book.stock}</p>
                
                <PurchaseForm 
                  bookId={book.id}
                  price={book.price}
                  stock={book.stock}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}