import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import { ClientLayout } from './client/layouts/ClientLayout';
import { Home } from './client/pages/Home';
import { Plants } from './client/pages/Plants';
import { PlantDetail } from './client/pages/Plants/Detail';
import { Knowledge } from './client/pages/Knowledge';
import { Mall } from './client/pages/Mall';
import { Activities } from './client/pages/Activities';
import { Profile } from './client/pages/Profile';
import { Login } from './client/pages/Login';

// Mock Auth State for Prototype
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Client Routes */}
        <Route path="/" element={isAuthenticated ? <ClientLayout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="plants" element={<Plants />} />
          <Route path="plants/:id" element={<PlantDetail />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="activities" element={<Activities />} />
          <Route path="mall" element={<Mall />} />
          <Route path="profile" element={<Profile onLogout={logout} />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login onLogin={login} />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
