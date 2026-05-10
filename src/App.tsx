import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ChatView from './views/ChatView';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/css/global/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatView />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
