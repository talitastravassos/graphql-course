import React from "react";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

export default function App() {
  return (
    <div id="main">
      <h1>Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}
