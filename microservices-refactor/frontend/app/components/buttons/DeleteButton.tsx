"use client";
import React from 'react';
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
        const response = await fetch(`/objective-3/api/book/delete-book/${bookId}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (response.status === 200) {
          alert("Book deleted successfully");
          router.push(ROUTES.CATALOG);
          router.refresh();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to delete book');
        }
      } catch {
        alert("An unexpected error occurred");
      }
  };
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
