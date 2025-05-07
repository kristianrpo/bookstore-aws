"use client";

import React from 'react';
import axios from 'axios';
import ROUTES_API from '@/constants/api.urls';
import ROUTES from '@/constants/urls';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  bookId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ bookId }) => {
    const router = useRouter();
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await axios.post(`${ROUTES_API.BOOK.DELETE(bookId)}`, null, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        });

        if (response.status === 201) {
          alert("Book deleted successfully");
            router.push(ROUTES.CATALOG);
          
        }

      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <button
      className="btn btn-sm btn-danger"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
