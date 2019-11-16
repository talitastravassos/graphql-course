import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  React.useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      console.log(loading);
      // console.log(error);
    }
  }, [data]);

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {loading ? (
            <option disabled>Loading authors</option>
          ) : (
            data.authors.map(author => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}
