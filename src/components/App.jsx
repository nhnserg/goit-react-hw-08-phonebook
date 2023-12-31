import { Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from './Loader/Loader';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavLayout } from './Navigation/NavLayout';
import { getCurrentThunk } from '../redux/Thunks/authThunk';
import { PublicRoute } from '../Guards/RestrictedRoute';
import { PrivateRoute } from '../Guards/PrivateRoute';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('../pages/HomePage/Home'));
const Register = lazy(() => import('../pages/RegisterPage/Register'));
const Login = lazy(() => import('../pages/LoginPage/Login'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentThunk());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
          />
          <Route path="register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
          />
          <Route path="login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
          />
          <Route path="contacts" element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
          />
          <Route path="*" element={<Navigate to="contacts" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}