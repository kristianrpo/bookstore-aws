import Link from 'next/link';
import ROUTES from '@/constants/urls';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bookstore - Home",
    description: "Welcome to the Bookstore Platform",
  };

export default function Home() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Bienvenido a la Plataforma Bookstore</h2>

      <div className="d-grid gap-3">
        <Link href={ROUTES.CATALOG} className='btn btn-primary btn-lg'>
            View Books Catalog
        </Link>

        <Link href={ROUTES.MY_BOOKS} className='btn btn-secondary btn-lg'>
            View My Books
        </Link>

        <Link href={ROUTES.ADMIN_USERS} className="btn btn-info btn-lg">
          List Registered Users
        </Link>
      </div>
    </div>
  );
}
