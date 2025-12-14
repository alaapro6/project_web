import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import StoresPage from './pages/StoresPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminStores from './admin/AdminStores';
import AdminGifts from './admin/AdminGifts';
import './App.css';

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/finder" element={<HomePage />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
	      <Route path="/admin/stores" element={<AdminStores />} />
	      <Route path="/admin/gifts" element={<AdminGifts />} />


            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
