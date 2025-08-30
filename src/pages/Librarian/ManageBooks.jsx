import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ManageBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedYear: '',
    copies: 1,
    description: ''
  });

  const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology', 'Literature', 'Philosophy'];

  // Mock data for demonstration
  useEffect(() => {
    const mockBooks = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        category: "Literature",
        publishedYear: 1925,
        totalCopies: 3,
        availableCopies: 2,
        borrowedCopies: 1,
        description: "A classic American novel set in the Jazz Age."
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0-06-112008-4",
        category: "Literature",
        publishedYear: 1960,
        totalCopies: 4,
        availableCopies: 3,
        borrowedCopies: 1,
        description: "A novel about racial injustice and childhood in the American South."
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "978-0-452-28423-4",
        category: "Fiction",
        publishedYear: 1949,
        totalCopies: 5,
        availableCopies: 3,
        borrowedCopies: 2,
        description: "A dystopian social science fiction novel."
      },
      {
        id: 4,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        isbn: "978-0-553-38016-3",
        category: "Science",
        publishedYear: 1988,
        totalCopies: 2,
        availableCopies: 2,
        borrowedCopies: 0,
        description: "A book on cosmology by physicist Stephen Hawking."
      },
      {
        id: 5,
        title: "The Art of War",
        author: "Sun Tzu",
        isbn: "978-0-486-42557-1",
        category: "Philosophy",
        publishedYear: -500,
        totalCopies: 3,
        availableCopies: 1,
        borrowedCopies: 2,
        description: "An ancient Chinese military treatise."
      }
    ];

    setTimeout(() => {
      setBooks(mockBooks);
      setFilteredBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter functionality
  useEffect(() => {
    let filtered = books;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(book => book.category === categoryFilter);
    }

    // Apply availability filter
    if (availabilityFilter !== 'all') {
      if (availabilityFilter === 'available') {
        filtered = filtered.filter(book => book.availableCopies > 0);
      } else if (availabilityFilter === 'unavailable') {
        filtered = filtered.filter(book => book.availableCopies === 0);
      }
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, categoryFilter, availabilityFilter]);

  const handleAddBook = (e) => {
    e.preventDefault();
    const book = {
      id: Date.now(),
      ...newBook,
      publishedYear: parseInt(newBook.publishedYear),
      copies: parseInt(newBook.copies),
      totalCopies: parseInt(newBook.copies),
      availableCopies: parseInt(newBook.copies),
      borrowedCopies: 0
    };

    setBooks(prevBooks => [...prevBooks, book]);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      category: '',
      publishedYear: '',
      copies: 1,
      description: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    }
  };

  const handleEditBook = (bookId) => {
    navigate(`/librarian/edit-book/${bookId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Books</h1>
            <p className="mt-2 text-gray-600">Add, edit, and manage your library collection</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 text-black-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add New Book
            </button>
            <Link
              to="/librarian/dashboard"
              className="bg-blue-600 text-black-900 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-gray-900">{books.length}</div>
          <div className="text-sm text-gray-600">Total Books</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-green-600">
            {books.reduce((sum, book) => sum + book.availableCopies, 0)}
          </div>
          <div className="text-sm text-gray-600">Available Copies</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {books.reduce((sum, book) => sum + book.borrowedCopies, 0)}
          </div>
          <div className="text-sm text-gray-600">Borrowed Copies</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(books.map(book => book.category)).size}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Books
            </label>
            <input
              type="text"
              placeholder="Search by title, author, ISBN, or category..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Filter
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability Filter
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="all">All Books</option>
              <option value="available">Available</option>
              <option value="unavailable">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  book.availableCopies > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                </div>
                <span className="text-xs text-gray-500">{book.category}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
              <p className="text-xs text-gray-500 mb-4">ISBN: {book.isbn}</p>
              
              <div className="text-sm text-gray-600 mb-4">
                <p>Published: {book.publishedYear}</p>
                <p>Available: {book.availableCopies}/{book.totalCopies}</p>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{book.description}</p>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditBook(book.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-black-900 px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-black-900 px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Book</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.title}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.author}
                    onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.category}
                    onChange={(e) => setNewBook({...newBook, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Year *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={new Date().getFullYear()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.publishedYear}
                    onChange={(e) => setNewBook({...newBook, publishedYear: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Copies *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.copies}
                    onChange={(e) => setNewBook({...newBook, copies: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newBook.description}
                    onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;