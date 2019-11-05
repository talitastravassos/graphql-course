import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getBooksQuery = gql`
  {
  books{
    id
    name
    genre
    author{
      id
      name
      books{
        id
        name
        genre
      }
    }
  }
}
`;

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  React.useEffect(() => {
    if (data !== undefined) {
      console.log(data);
    //   console.log(loading);
    //   console.log(error);
    }
  }, [data]);

  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );
}
