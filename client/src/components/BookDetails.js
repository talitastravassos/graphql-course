import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries";

export default function BookDetails(props) {
  const { loading, data } = useQuery(getBookQuery, {
    variables: { id: props.id }
  });

  React.useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      // console.log(loading);
      // console.log(error);
    }
  }, [data]);

  return !loading ? (
    <div id='book-details'>
      <h2>{data.book.name}</h2>
      <p>{data.book.genre}</p>
      <p>{data.book.author.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {data.book.author.books.map(item => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
