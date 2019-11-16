import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

export default function AddBook() {
  const { loading, data } = useQuery(getAuthorsQuery);
  const [addBook, { dataNewBook }] = useMutation(addBookMutation);

  const [state, setState] = React.useState({
    name: "",
    genre: "",
    authorId: ""
  });

  React.useEffect(() => {
    if (data !== undefined) {
      console.log(data);
      console.log(loading);
      // console.log(error);
    }
  }, [data]);

  React.useEffect(() => console.log(state), [state]);

  const onChange = e => {
    //   console.log(e.target.value)
    const { value, name } = e.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitForm = e => {
    e.preventDefault();
    console.log(state);
    addBook({
      variables: {
        name: state.name,
        genre: state.genre,
        authorId: state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    }).then(res => {
      console.log(res);
      setState({
        name: "",
        genre: "",
        authorId: ""
      });
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name={"name"} onChange={onChange} value={state.name} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" name={"genre"} onChange={onChange}  value={state.genre}/>
      </div>
      <div className="field">
        <label>Author:</label>
        <select name={"authorId"} onChange={onChange} value={state.authorId}>
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
