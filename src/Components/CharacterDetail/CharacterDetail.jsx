import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const CharacterDetail = ({
  characterDetail,
  addToFavoriteHandler,
  removeFromFavoriteHandler,
  favoriteCharacters,
}) => {
  const [episodesData, setEpisodesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = await Promise.all(
        characterDetail.episode.map(async (episode) => {
          const res = await fetch(episode);
          const data = await res.json();
          return { url: episode, data };
        })
      );

      const formattedData = episodes.reduce((acc, ep) => {
        acc[ep.url] = ep.data;
        return acc;
      }, {});

      setEpisodesData(formattedData);
      setLoading(false); // بارگذاری تمام شده
    };

    fetchEpisodes();
  }, [characterDetail.episode]);

  if (loading) {
    return <div>Loading...</div>; // نمایش حالت بارگذاری
  }

  return (
    <div className="font-sans">
      <div className="font-sans h-52 flex space-x-4 items-center bg-slate-700 bg-opacity-80 shadow-md rounded-md p-2 my-2 pl-0 py-0">
        {/* character img */}
        <div>
          <img
            className="w-52 rounded-l-md"
            src={characterDetail.image}
            alt="img"
          />
        </div>
        {/* character short detail */}
        <div className="flex flex-col space-y-4 pt-2 ">
          <div className="flex flex-col text-xl font-bold space-y-2 ">
            <p>{characterDetail.name}</p>
            <div className="flex items-center">
              <p
                className={`w-3 h-3 rounded-full mr-2 ${
                  characterDetail.status === "Alive"
                    ? "bg-green-500"
                    : characterDetail.status === "Dead"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              ></p>
              <p>{characterDetail.status}</p>
              <p className="mx-2">-</p>
              <p>{characterDetail.species}</p>
            </div>
          </div>
          <div className="flex flex-col text-sm space-y-1 ">
            <p className="text-slate-400">Last known location:</p>
            <p className="font-bold">{characterDetail.location.name}</p>
          </div>

          {favoriteCharacters.includes(characterDetail.id) === true ? (
            <button
              onClick={() => {
                removeFromFavoriteHandler(characterDetail.id);
              }}
              className="text-white text-sm p-2 w-4/5 rounded-xl font-bold"
            >
              <MdFavorite className="text-red-500 text-3xl " />
            </button>
          ) : (
            <button
              onClick={() => {
                addToFavoriteHandler(characterDetail.id);
              }}
              className="text-white text-sm p-2 w-4/5 rounded-xl font-bold"
            >
              <FaRegHeart className="text-red-500 text-3xl " />
            </button>
          )}
        </div>
      </div>

      {/* List of episodes */}
      <div className="flex flex-col space-y-4 p-2 bg-slate-700 bg-opacity-80">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">List of Episodes :</p>
          <button className="bg-white text-black rounded-full p-1">
            <FaArrowDown />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          {characterDetail.episode.map((ep, index) => (
            <div key={ep} className="flex justify-between items-center text-sm">
              <div className="flex space-x-2">
                <p className="font-bold">
                  0{index + 1} - {episodesData[ep]?.episode}
                </p>
                <p className="font-bold">{episodesData[ep]?.name}</p>
              </div>
              <div className="bg-slate-500 text-white p-1 px-2 rounded-full">
                {episodesData[ep]?.air_date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
