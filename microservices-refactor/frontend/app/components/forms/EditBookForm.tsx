"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ROUTES_API from '@/constants/api.urls';
import ROUTES from '@/constants/urls';
import Link from 'next/link';

interface EditBookFormProps {
    id: string;
    book: {
        title: string;
        author: string;
        description: string;
        price: number;
        stock: number;
    };
}

export default function AddBookForm({id, book}: EditBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [price, setPrice] = useState(book.price);
  const [stock, setStock] = useState(book.stock);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());

    try {
      const response = await axios.post(
        ROUTES_API.BOOK.UPDATE(id),
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        router.push(ROUTES.CATALOG);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Unknown error");
      }
    }
  }

  return (
    <div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            step="0.01"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
        <Link href={ROUTES.CATALOG}>Cancel</Link>
      </form>
    </div>
  );
}
