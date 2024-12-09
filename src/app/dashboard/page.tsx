'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';

export default function Dashboard() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    dispatch(logout());
    router.push('/login'); // Redirect to login page
  };

  if (!isAuthenticated) {
    router.push('/login'); // Redirect to login if unauthenticated
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
