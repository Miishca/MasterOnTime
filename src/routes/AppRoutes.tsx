import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpecialistsPage from '../features/specialists/pages/SpecialistsPage';
import ServicesPage from '../features/services/pages/ServicesPage';
import PeoplePage from '../features/specialists/pages/PeoplePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import ProfilePageSetup from '../pages/ProfilePageSetup';
import RegisterPage from '../pages/RegisterPage';
import BookingPage from '../pages/BookingPage';
import EndBookingPage from '../pages/EndBookingPage';
import BookingsPage from '../pages/BookingsPage';
import AdminPage from '../pages/AdminPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SpecialistsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/people" element={<PeoplePage />} />
       <Route path="/people/:id" element={<ProfilePage />} />
       <Route path="/profile" element={<ProfilePageSetup />} />
      <Route path="/book/confirmation" element={<EndBookingPage />} />
      <Route path="/book/:specialistId" element={<BookingPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
