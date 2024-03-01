import React, { useEffect, useLayoutEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [names, setNames] = useState([]);
  console.log(names, "names");
  const handleFetch = async () => {
    try {
      const data = await fetch("https://anapioficeandfire.com/api/books");
      const json = await data.json();
      setBooks(json);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    // Fetch povCharactersData when books are updated
    const fetchPovCharactersData = async () => {
      try {
        const povData = await Promise.all(
          books.map((book) =>
            Promise.all(
              book.povCharacter.map((url) => {
                const data = fetch(url);
                const resp = data.json();
                console.log(resp, "resp");
              })
            )
          )
        );
        setNames(povData);
      } catch {}
    };

    fetchPovCharactersData();
  }, [books]);

  return (
    <>
      {/* {names.map((name) => <ul>
        <li>{name}</li>
     </ul> )} */}
    </>
  );
};

export default Books;
