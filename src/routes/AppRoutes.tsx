import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpecialistsPage from '../features/specialists/pages/SpecialistsPage';
import ServicesPage from '../features/services/pages/ServicesPage';
import PeoplePage from '../features/specialists/pages/PeoplePage';
import ProfilePage from '../pages/ProfilePage';
import SpecialistProfile from '../pages/SpecialistProfile';
// import BookingPage from '../features/booking/pages/BookingPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SpecialistsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/people" element={<PeoplePage />} />
       <Route path="/people/:id" element={<ProfilePage />} />
       <Route path="/profile" element={<SpecialistProfile />} />
      {/*<Route path="/book" element={<BookingPage />} />
      <Route path="/specialist/:id" element={<SpecialistProfile />} />
      <Route path="/booking/:specialistId" element={<BookingPage />} /> */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
