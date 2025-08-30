import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Borrower/Dashboard';
import BookDetails from './pages/Borrower/BookDetails';
import Profile from './pages/Borrower/Profile';
import LibrarianDashboard from './pages/Librarian/Dashboard';
import ManageBooks from './pages/Librarian/ManageBooks';
import EditBook from './pages/Librarian/EditBook';
import BorrowRecords from './pages/Librarian/BorrowRecords';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-pink-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Borrower Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/book/:id" element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Librarian Routes */}
              <Route path="/librarian" element={
                <ProtectedRoute requireLibrarian>
                  <LibrarianDashboard />
                </ProtectedRoute>
              } />
              <Route path="/librarian/books" element={
                <ProtectedRoute requireLibrarian>
                  <ManageBooks />
                </ProtectedRoute>
              } />
              <Route path="/librarian/book/edit/:id" element={
                <ProtectedRoute requireLibrarian>
                  <EditBook />
                </ProtectedRoute>
              } />
              <Route path="/librarian/borrow-records" element={
                <ProtectedRoute requireLibrarian>
                  <BorrowRecords />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
 

export default App
