import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AchievementsSection from './components/AchievementsSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import PolicyModals from './components/PolicyModals';
import { getWaitlistStats, warmupBackend } from './services/api';

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    warmupBackend();
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getWaitlistStats();
    setStats(data);
  };

  const handleQuickSubmit = (email) => {
    setInitialEmail(email);
    setIsWaitlistOpen(true);
  };

  const handleOpenWaitlist = () => {
    setInitialEmail('');
    setIsWaitlistOpen(true);
  };

  const handleRegistrationSuccess = (data) => {
    loadStats();
  };

  return (
    <div className="min-vh-100 d-flex flex-column tz-app-wrapper">
      {/* Navigation */}
      <Navbar
        onOpenWaitlist={handleOpenWaitlist}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow-1">
        {/* Hero Section matching PDF Mockup */}
        <HeroSection
          onQuickSubmit={handleQuickSubmit}
          stats={stats}
        />

        {/* Authentic Achievements Section */}
        <AchievementsSection />

        {/* Core Features Section */}
        <FeaturesSection
          onOpenWaitlist={handleOpenWaitlist}
        />

        {/* About Company & Commuter Solutions Section */}
        <AboutSection
          onOpenWaitlist={handleOpenWaitlist}
        />

        {/* Contact & Fleet Operators Inquiries Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setShowPrivacy(true)}
        onOpenTerms={() => setShowTerms(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenWaitlist={handleOpenWaitlist}
      />

      {/* Join Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        initialEmail={initialEmail}
        onRegistrationSuccess={handleRegistrationSuccess}
        onOpenPrivacy={() => setShowPrivacy(true)}
      />

      {/* Admin Management Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Legal Policy Modals */}
      <PolicyModals
        showPrivacy={showPrivacy}
        showTerms={showTerms}
        onClosePrivacy={() => setShowPrivacy(false)}
        onCloseTerms={() => setShowTerms(false)}
      />
    </div>
  );
}
