import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries";
import BookDetails from "./BookDetails";

export default function BookList() {
  const { loading, data } = useQuery(getBooksQuery);
  const [selectID, setSelectID] = React.useState('')

  React.useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      // console.log(loading);
      // console.log(error);
    }
  }, [data]);

  const onClick = (id) => {
    // console.log(id)
    setSelectID(id)
  }

  return !loading ? (
    <div>
      <ul id="book-list">
        {data.books.map(book => {
          return <li key={book.id} onClick={()=> onClick(book.id)}> {book.name}</li>;
        })}
      </ul>
      { (selectID !== '') ? <BookDetails id={selectID}/> : ''}      
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
