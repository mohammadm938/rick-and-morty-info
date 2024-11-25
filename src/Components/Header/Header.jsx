import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Header = ({
  resultsLen,
  favoriteCharacters,
  showFavoriteCharactersHandler,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <header className="bg-slate-600 rounded-md flex justify-between items-center w-full p-5 font-mono">
      <div>Logo</div>
      <div className="flex ">
        <input
          className="focus:outline-none rounded-md rounded-r-none p-1 px-2 bg-slate-500 text-white border border-slate-400 border-r-0"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="bg-slate-500 p-1 rounded-r-md border border-slate-400 border-l-0">
          <button
            onClick={handleSearch}
            className="rounded-full bg-slate-500 p-1 ml-1"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <p>Found {resultsLen} Results</p>

      <button
        onClick={() => showFavoriteCharactersHandler()}
        className="flex items-center justify-center "
      >
        <FaRegHeart className="text-red-500 text-2xl" />
        <span className="text-xs bg-red-500 text-white rounded-full p-2 flex justify-center items-center h-5 w-5 -ml-2 -mt-3">
          {favoriteCharacters.length}
        </span>
      </button>
    </header>
  );
};

export default Header;
