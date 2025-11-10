import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './components/auth/AuthForm';
import ProfileSelection from './components/profile/ProfileSelection';
import { useAuthStore } from './stores/authStore';
import { useProfileStore } from './stores/profileStore';

function App() {
  const { user, loading: authLoading } = useAuthStore();
  const { selectedProfile, fetchProfiles, loading: profileLoading } = useProfileStore();

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user, fetchProfiles]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (!selectedProfile) {
    return <ProfileSelection />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;