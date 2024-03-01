import React, { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

  const handleFetch = async () => {
    try {
      const data = await fetch("https://anapioficeandfire.com/api/books");
      const json = await data.json();
      console.log(json)
      setBooks(json);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchCharacterData = async (url) => {
    try {
      const response = await fetch(url);
      const characterData = await response.json();
      return characterData.name; // Adjust this based on your actual data structure
    } catch (error) {
      console.error(`Error fetching character data from ${url}:`, error);
      return "Unknown"; // Set a default name if there's an error
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    // Fetch povCharactersData when books are updated
    const fetchPovCharactersData = async () => {
      try {
        const povCharactersData = await Promise.all(
          books.map((book) =>
            Promise.all(
              book.povCharacters.map((characterUrl) =>
                fetchCharacterData(characterUrl)
              )
            )
          )
        );
        console.log("Data for POV Characters:", povCharactersData);
      } catch (error) {
        console.error("Error fetching povCharactersData:", error);
      }
    };

    fetchPovCharactersData();
  }, [books]);

  return (
    <>
      <h1>Books</h1>
      {/* Display names on the UI */}
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.name}</h2>
          <ul>
            {book.povCharacters.map((characterUrl, characterIndex) => (
              <li key={characterIndex}>
                {/* Display the character name here */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default Books;
