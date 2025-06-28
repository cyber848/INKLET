import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Poems from './pages/Poems';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poems" element={<Poems />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<div className="p-8">Blog page coming soon...</div>} />
            <Route path="/about" element={<div className="p-8">About page coming soon...</div>} />
            <Route path="/submit" element={<div className="p-8">Submit page coming soon...</div>} />
            <Route path="/profile" element={<div className="p-8">Profile page coming soon...</div>} />
            <Route path="/admin" element={<div className="p-8">Admin panel coming soon...</div>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;