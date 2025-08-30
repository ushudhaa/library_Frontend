import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BookCard from '../../components/BookCard';
import SearchBar from '../../components/SearchBar';

const Dashboard = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockBooks = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0743273565",
        category: "Fiction",
        available: true,
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0446310789",
        category: "Fiction",
        available: true,
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        category: "Dystopian",
        available: false,
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
      },
      {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "978-0141439518",
        category: "Romance",
        available: true,
        cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop"
      },
      {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "978-0547928241",
        category: "Fantasy",
        available: true,
        cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
      },
      {
        id: 6,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        isbn: "978-0316769488",
        category: "Fiction",
        available: true,
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
      }
    ];

    const mockBorrowedBooks = [
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        category: "Dystopian",
        available: false,
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        borrowedDate: "2024-01-15",
        dueDate: "2024-02-15"
      }
    ];

    setBooks(mockBooks);
    setBorrowedBooks(mockBorrowedBooks);
    setLoading(false);
  }, []);

  const filteredBooks = books.filter(book =>
    book.available && (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleBorrow = (bookId) => {
    // Mock borrow functionality
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
      const borrowedBook = {
        ...book,
        available: false,
        borrowedDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      setBorrowedBooks(prev => [...prev, borrowedBook]);
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, available: false } : b));
    }
  };

  const handleReturn = (bookId) => {
    // Mock return functionality
    setBorrowedBooks(prev => prev.filter(b => b.id !== bookId));
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, available: true } : b));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-blue-100">
          Manage your borrowed books and discover new ones to read.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Borrowed Books</p>
              <p className="text-2xl font-semibold text-gray-900">{borrowedBooks.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Books</p>
              <p className="text-2xl font-semibold text-gray-900">{books.filter(b => b.available).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Books</p>
              <p className="text-2xl font-semibold text-gray-900">{books.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Borrowed Books Section */}
      {borrowedBooks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Borrowed Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map(book => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      Borrowed
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                  <div className="text-xs text-gray-500 space-y-1 mb-4">
                    <p>Borrowed: {book.borrowedDate}</p>
                    <p>Due: {book.dueDate}</p>
                  </div>
                  <button
                    onClick={() => handleReturn(book.id)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Return Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Books Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Available Books</h2>
          <div className="w-full sm:w-96">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <p className="text-gray-500 text-xs mb-3">ISBN: {book.isbn}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {book.category}
                  </span>
                  <button
                    onClick={() => handleBorrow(book.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Borrow →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
