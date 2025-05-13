'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin - Usuarios</h1>
      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="border p-2 mb-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
