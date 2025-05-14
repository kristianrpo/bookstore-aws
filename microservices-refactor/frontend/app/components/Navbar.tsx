"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import ROUTES from "@/constants/urls";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/objective-3/api/auth/user', { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setName(response.data.name);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  });

  const handleLogout = async () => {
    try {
      const response = await axios.get('/objective-3/api/auth/logout', { withCredentials: true });

      if (response.status === 200) {
        setIsAuthenticated(false);
        setName('');
        router.push(ROUTES.LOGIN);
      }
    } catch {
      console.error('Logout failed');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href={ROUTES.HOME}>Bookstore</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" href={ROUTES.CATALOG}>Catalog</Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="navbar-text text-white me-3">
                    User: {name}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={ROUTES.MY_BOOKS}>My books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={ROUTES.MY_DELIVERIES}>My deliveries</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={ROUTES.ADMIN_USERS}>Users</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href={ROUTES.LOGIN}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href={ROUTES.REGISTER}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
