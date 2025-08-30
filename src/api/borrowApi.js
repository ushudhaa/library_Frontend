// mock borrow api
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/borrow" });

export const borrowBook = (bookId) => API.post("/", { bookId });
export const returnBook = (borrowId) => API.put(`/${borrowId}/return`);
export const getBorrowedBooks = () => API.get("/");
