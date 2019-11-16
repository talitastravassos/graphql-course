import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries";

export default function BookList() {
  const { loading, data } = useQuery(getBooksQuery);

  React.useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      console.log(loading);
      // console.log(error);
    }
  }, [data]);

  return !loading ? (
    <div>
      <ul id="book-list">
        {data.books.map(book => {
          return <li key={book.id}> {book.name}</li>;
        })}
      </ul>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
