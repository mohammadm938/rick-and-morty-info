import { FaRegEye } from "react-icons/fa";

const CharacterList = ({ character, viewMoreDetailHandler }) => {
  return (
    <div className="flex justify-between items-center bg-slate-700 bg-opacity-80 shadow-md rounded-md p-2 my-2">
      {/* character img */}
      <div>
        <img className="w-14 rounded-full" src={character.image} alt="img" />
      </div>
      {/* character short detail */}
      <div className="flex flex-col text-sm space-y-2">
        {/* character name */}
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {character.name}
        </p>
        {/* character status */}
        <div className="flex items-center">
          {/* circle */}
          <p
            className={`w-3 h-3 rounded-full mr-2 ${
              character.status === "Alive"
                ? "bg-green-500"
                : character.status === "Dead"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          ></p>
          {/* status */}
          <p>{character.status}</p>
          {/* species */}
          <p className="mx-2">-</p>
          <p>{character.species}</p>
        </div>
      </div>

      {/* character view more button */}
      <button
        className="text-red-400 text-lg"
        onClick={() => {
          viewMoreDetailHandler(character.id);
        }}
      >
        <FaRegEye />
      </button>
    </div>
  );
};

export default CharacterList;
