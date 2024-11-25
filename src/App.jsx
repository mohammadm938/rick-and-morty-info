import { useEffect, useState } from "react";
import CharacterDetail from "./Components/CharacterDetail/CharacterDetail";
import CharactersList from "./Components/CharactersList/CharactersList";
import Header from "./components/Header/Header";
import axios from "axios";

function App() {
  const [charactersData, setCharactersData] = useState({});
  const [characterDetail, setCharacterDetail] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // فراخوانی اولیه کاراکترها
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => setCharactersData(res.data.results))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const handleSearch = () => {
    // درخواست جستجو به API
    if (searchQuery.trim()) {
      axios
        .get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`)
        .then((res) => setCharactersData(res.data.results))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
      setPage(1);
    } else {
      axios
        .get("https://rickandmortyapi.com/api/character")
        .then((res) => setCharactersData(res.data.results))
        .catch((error) => console.error("Error resetting characters:", error));
      setPage(1);
    }
  };

  const handlepageChange = (newPage) => {
    setPage(newPage);
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${newPage}`)
      .then((res) => {
        setCharactersData(res.data.results);
      });
  };

  const viewMoreDetailHandler = (id) => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res) => {
      setCharacterDetail(res.data);
    });
  };

  const addToFavoriteHandler = (id) => {
    if (!favoriteCharacters.includes(id)) {
      setFavoriteCharacters((prev) => [...prev, id]);
    }
  };

  const removeFromFavoriteHandler = (id) => {
    const updatedFavorites = favoriteCharacters.filter(
      (charId) => charId !== id
    );
    setFavoriteCharacters(updatedFavorites);
    showFavoriteCharactersHandler(updatedFavorites); // ارسال لیست به‌روزرسانی‌شده
  };

  const showFavoriteCharactersHandler = (favorites) => {
    const favoritesList = favorites || favoriteCharacters; // استفاده از آرگومان اگر ارسال شده باشد
    Promise.all(
      favoritesList.map((id) =>
        axios
          .get(`https://rickandmortyapi.com/api/character/${id}`)
          .then((res) => res.data)
      )
    )
      .then((data) => {
        setCharactersData(data); // ذخیره لیست محبوب در استیت اصلی
      })
      .catch((error) =>
        console.error("Error fetching favorite characters:", error)
      );
    setPage("fav");
  };

  return (
    <div className="h-full w-full flex flex-col p-10 text-white">
      <div className="flex flex-col justify-center items-center rounded-md">
        <Header
          resultsLen={charactersData.length}
          favoriteCharacters={favoriteCharacters}
          showFavoriteCharactersHandler={showFavoriteCharactersHandler}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        <div className="flex justify-between w-full mt-5 new_font">
          {/* div left characters */}
          <CharactersList
            charactersData={charactersData}
            viewMoreDetailHandler={viewMoreDetailHandler}
            page={page}
            handlepageChange={handlepageChange}
          />

          {/* div right  */}
          <div className="w-3/4 ml-4 flex flex-col">
            {characterDetail && (
              <CharacterDetail
                addToFavoriteHandler={addToFavoriteHandler}
                characterDetail={characterDetail}
                removeFromFavoriteHandler={removeFromFavoriteHandler}
                favoriteCharacters={favoriteCharacters}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
