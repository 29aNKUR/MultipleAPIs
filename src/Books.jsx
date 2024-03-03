import React, { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  const handleFetch = () => {
    fetch("https://anapioficeandfire.com/api/books")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        setBooks(json);
    })
    .catch((error) => {
        console.log(error)
    })
  };

  const fetchCharacterData = (url) => {
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
        console.log(error);
    })
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    // Fetch povCharactersData when books are updated
    const fetchPovCharactersData = () => {
        try {
            const dataPromises = books.map((book) => {
                const characterDataPromises = book.povCharacters.map((url) => fetchCharacterData(url));
                return Promise.all(characterDataPromises); 
            });

            Promise.all(dataPromises)
            .then((data) => {
                console.log(data,"data");
            })
            .catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.log(error)
        }
    };

    fetchPovCharactersData();
  }, [books]);

  return (
    <>
      <h1>Books</h1>
    </>
  );
};

export default Books;
