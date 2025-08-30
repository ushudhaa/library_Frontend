
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BorrowRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('borrowedDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data for demonstration
  useEffect(() => {
    const mockRecords = [
      {
        id: 1,
        bookTitle: "The Great Gatsby",
        bookAuthor: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        userName: "John Doe",
        userEmail: "john.doe@email.com",
        borrowedDate: "2024-01-15",
        dueDate: "2024-02-15",
        returnedDate: null,
        status: "active",
        fineAmount: 0
      },
      {
        id: 2,
        bookTitle: "To Kill a Mockingbird",
        bookAuthor: "Harper Lee",
        isbn: "978-0-06-112008-4",
        userName: "Jane Smith",
        userEmail: "jane.smith@email.com",
        borrowedDate: "2024-01-14",
        dueDate: "2024-02-14",
        returnedDate: null,
        status: "active",
        fineAmount: 0
      },
      {
        id: 3,
        bookTitle: "1984",
        bookAuthor: "George Orwell",
        isbn: "978-0-452-28423-4",
        userName: "Mike Johnson",
        userEmail: "mike.johnson@email.com",
        borrowedDate: "2024-01-10",
        dueDate: "2024-02-10",
        returnedDate: null,
        status: "overdue",
        fineAmount: 15.50
      },
      {
        id: 4,
        bookTitle: "Pride and Prejudice",
        bookAuthor: "Jane Austen",
        isbn: "978-0-14-143951-8",
        userName: "Sarah Wilson",
        userEmail: "sarah.wilson@email.com",
        borrowedDate: "2024-01-05",
        dueDate: "2024-02-05",
        returnedDate: "2024-01-30",
        status: "returned",
        fineAmount: 0
      },
      {
        id: 5,
        bookTitle: "The Catcher in the Rye",
        bookAuthor: "J.D. Salinger",
        isbn: "978-0-316-76948-0",
        userName: "David Brown",
        userEmail: "david.brown@email.com",
        borrowedDate: "2024-01-08",
        dueDate: "2024-02-08",
        returnedDate: "2024-02-12",
        status: "returned",
        fineAmount: 5.00
      }
    ];

    setTimeout(() => {
      setRecords(mockRecords);
      setFilteredRecords(mockRecords);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = records;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.isbn.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy.includes('Date')) {
        aValue = new Date(aValue || '9999-12-31');
        bValue = new Date(bValue || '9999-12-31');
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRecords(filtered);
  }, [records, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleReturnBook = (recordId) => {
    const today = new Date().toISOString().split('T')[0];
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId
          ? { ...record, status: 'returned', returnedDate: today }
          : record
      )
    );
  };

  const handleRenewBook = (recordId) => {
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + 30);
    const formattedDate = newDueDate.toISOString().split('T')[0];

    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === recordId
          ? { ...record, dueDate: formattedDate, status: 'active', fineAmount: 0 }
          : record
      )
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      returned: 'bg-gray-100 text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
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
            <h1 className="text-3xl font-bold text-gray-900">Borrow Records</h1>
            <p className="mt-2 text-gray-600">Manage and track all book borrowing activities</p>
          </div>
          <Link
            to="/librarian/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Records
            </label>
            <input
              type="text"
              placeholder="Search by book, user, author, or ISBN..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Filter
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="returned">Returned</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="borrowedDate">Borrowed Date</option>
              <option value="dueDate">Due Date</option>
              <option value="returnedDate">Returned Date</option>
              <option value="bookTitle">Book Title</option>
              <option value="userName">User Name</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Records ({filteredRecords.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.bookTitle}</div>
                      <div className="text-sm text-gray-500">by {record.bookAuthor}</div>
                      <div className="text-xs text-gray-400">ISBN: {record.isbn}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.userName}</div>
                      <div className="text-sm text-gray-500">{record.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        <strong>Borrowed:</strong> {record.borrowedDate}
                      </div>
                      <div className="text-sm text-gray-900">
                        <strong>Due:</strong> {record.dueDate}
                      </div>
                      {record.returnedDate && (
                        <div className="text-sm text-gray-900">
                          <strong>Returned:</strong> {record.returnedDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {record.fineAmount > 0 ? `$${record.fineAmount.toFixed(2)}` : '$0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {record.status === 'active' && (
                        <button
                          onClick={() => handleReturnBook(record.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                        >
                          Return
                        </button>
                      )}
                      {record.status === 'overdue' && (
                        <>
                          <button
                            onClick={() => handleReturnBook(record.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Return
                          </button>
                          <button
                            onClick={() => handleRenewBook(record.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Renew
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowRecords;