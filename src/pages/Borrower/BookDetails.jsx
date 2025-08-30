import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [borrowing, setBorrowing] = useState(false);

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
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
        description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
        publishedYear: 1925,
        pages: 180,
        language: "English",
        publisher: "Scribner",
        rating: 4.2,
        reviews: 1250
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0446310789",
        category: "Fiction",
        available: true,
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        description: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
        publishedYear: 1960,
        pages: 281,
        language: "English",
        publisher: "J. B. Lippincott & Co.",
        rating: 4.3,
        reviews: 2100
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        category: "Dystopian",
        available: false,
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        description: "Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
        publishedYear: 1949,
        pages: 328,
        language: "English",
        publisher: "Secker & Warburg",
        rating: 4.1,
        reviews: 1800
      }
    ];

    const foundBook = mockBooks.find(b => b.id === parseInt(id));
    const related = mockBooks.filter(b => b.id !== parseInt(id) && b.category === foundBook?.category);

    setBook(foundBook);
    setRelatedBooks(related);
    setLoading(false);
  }, [id]);

  const handleBorrow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBorrowing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBook(prev => ({ ...prev, available: false }));
    setBorrowing(false);
    
    // Show success message or redirect
    alert('Book borrowed successfully!');
  };

  const handleReturn = async () => {
    setBorrowing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBook(prev => ({ ...prev, available: true }));
    setBorrowing(false);
    
    alert('Book returned successfully!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2">{book.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover and Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    book.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.available ? 'Available' : 'Borrowed'}
                  </span>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({book.reviews} reviews)</span>
                  </div>
                </div>

                {book.available ? (
                  <button
                    onClick={handleBorrow}
                    disabled={borrowing}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                  >
                    {borrowing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Borrowing...
                      </div>
                    ) : (
                      'Borrow This Book'
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleReturn}
                    disabled={borrowing}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                  >
                    {borrowing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Returning...
                      </div>
                    ) : (
                      'Return This Book'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">by {book.author}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ISBN:</span>
                    <span className="font-medium">{book.isbn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{book.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium">{book.publishedYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pages:</span>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{book.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Publisher:</span>
                    <span className="font-medium">{book.publisher}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>
            </div>

            {/* Related Books */}
            {relatedBooks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Books</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedBooks.map(relatedBook => (
                    <div
                      key={relatedBook.id}
                      onClick={() => navigate(`/book/${relatedBook.id}`)}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200"
                    >
                      <img
                        src={relatedBook.cover}
                        alt={relatedBook.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{relatedBook.title}</h4>
                        <p className="text-sm text-gray-600">by {relatedBook.author}</p>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          relatedBook.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {relatedBook.available ? 'Available' : 'Borrowed'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
