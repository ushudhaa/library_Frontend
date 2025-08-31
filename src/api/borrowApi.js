// mock borrow api
import axios from "axios";

const API = axios.create({ baseURL: "https://library-backend-7.onrender.com/api/borrow" });

export const borrowBook = (bookId) => API.post("/", { bookId });
export const returnBook = (borrowId) => API.put(`/${borrowId}/return`);
export const getBorrowedBooks = () => API.get("/");
