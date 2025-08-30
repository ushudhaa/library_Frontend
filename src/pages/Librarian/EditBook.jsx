import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedYear: '',
    totalCopies: 1,
    availableCopies: 1,
    borrowedCopies: 0,
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

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
      }
    ];

    // Find book by ID
    const foundBook = mockBooks.find(b => b.id === parseInt(id));
    
    if (foundBook) {
      setBook(foundBook);
    } else {
      // If book not found, redirect to manage books
      navigate('/librarian/books');
      return;
    }

    setLoading(false);
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!book.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!book.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!book.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }

    if (!book.category) {
      newErrors.category = 'Category is required';
    }

    if (!book.publishedYear || book.publishedYear < 1 || book.publishedYear > new Date().getFullYear()) {
      newErrors.publishedYear = 'Valid published year is required';
    }

    if (!book.totalCopies || book.totalCopies < 1) {
      newErrors.totalCopies = 'At least 1 copy is required';
    }

    if (book.totalCopies < book.borrowedCopies) {
      newErrors.totalCopies = 'Total copies cannot be less than borrowed copies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));

    // Update available copies when total copies change
    if (name === 'totalCopies') {
      const totalCopies = parseInt(value) || 0;
      const borrowedCopies = book.borrowedCopies;
      const availableCopies = Math.max(0, totalCopies - borrowedCopies);
      
      setBook(prevBook => ({
        ...prevBook,
        totalCopies: totalCopies,
        availableCopies: availableCopies
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally make an API call to update the book
      console.log('Book updated:', book);
      
      // Navigate back to manage books with success message
      navigate('/librarian/books', { 
        state: { message: 'Book updated successfully!' }
      });
    } catch (error) {
      console.error('Error updating book:', error);
      setErrors({ general: 'Failed to update book. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (book.borrowedCopies > 0) {
      alert('Cannot delete a book that has borrowed copies. Please wait for all copies to be returned.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      setSaving(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Here you would normally make an API call to delete the book
        console.log('Book deleted:', book.id);
        
        // Navigate back to manage books with success message
        navigate('/librarian/books', { 
          state: { message: 'Book deleted successfully!' }
        });
      } catch (error) {
        console.error('Error deleting book:', error);
        setErrors({ general: 'Failed to delete book. Please try again.' });
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
            <p className="mt-2 text-gray-600">Update book information and manage copies</p>
          </div>
          <Link
            to="/librarian/books"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Books
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={book.title}
                  onChange={handleInputChange}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.author ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={book.author}
                  onChange={handleInputChange}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN *
                </label>
                <input
                  type="text"
                  name="isbn"
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.isbn ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={book.isbn}
                  onChange={handleInputChange}
                />
                {errors.isbn && (
                  <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={book.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Year *
                </label>
                <input
                  type="number"
                  name="publishedYear"
                  required
                  min="1"
                  max={new Date().getFullYear()}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.publishedYear ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={book.publishedYear}
                  onChange={handleInputChange}
                />
                {errors.publishedYear && (
                  <p className="mt-1 text-sm text-red-600">{errors.publishedYear}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Copies *
                </label>
                <input
                  type="number"
                  name="totalCopies"
                  required
                  min="1"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.totalCopies ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={book.totalCopies}
                  onChange={handleInputChange}
                />
                {errors.totalCopies && (
                  <p className="mt-1 text-sm text-red-600">{errors.totalCopies}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Currently {book.borrowedCopies} copies are borrowed
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={book.description}
                onChange={handleInputChange}
                placeholder="Enter book description..."
              />
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving || book.borrowedCopies > 0}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  book.borrowedCopies > 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {saving ? 'Processing...' : 'Delete Book'}
              </button>

              <div className="flex space-x-3">
                <Link
                  to="/librarian/books"
                  className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving...' : 'Update Book'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Book Information Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Book Information</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">Total Copies</p>
                    <p className="text-lg font-bold text-blue-600">{book.totalCopies}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-900">Available</p>
                    <p className="text-lg font-bold text-green-600">{book.availableCopies}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-900">Borrowed</p>
                    <p className="text-lg font-bold text-yellow-600">{book.borrowedCopies}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Link
                  to="/librarian/borrow-records"
                  className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  View Borrow Records
                </Link>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded transition-colors"
                  onClick={() => alert('Feature coming soon!')}
                >
                  Add to Featured
                </button>
              </div>
            </div>

            {book.borrowedCopies > 0 && (
              <div className="border-t pt-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        This book cannot be deleted while copies are borrowed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

