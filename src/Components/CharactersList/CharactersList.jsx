import { useEffect, useState } from "react";
import CharacterList from "./CharacterList";

const CharactersList = ({
  charactersData,
  viewMoreDetailHandler,
  page,
  handlepageChange,
}) => {
  return (
    <>
      {charactersData && charactersData.length > 0 ? (
        <div className="w-2/5 flex flex-col gap-2">
          {charactersData.map((character) => (
            <CharacterList
              key={character.id}
              character={character}
              viewMoreDetailHandler={viewMoreDetailHandler}
            />
          ))}
          {page !== "fav" && (
            <div className=" flex justify-center items-center gap-4">
              {page > 1 && (
                <button
                  onClick={() => {
                    handlepageChange(page - 1);
                  }}
                  className="bg-slate-600 p-2 rounded-full w-9 flex items-center justify-center font-bold"
                >
                  {page - 1}
                </button>
              )}
              <button className="bg-slate-600 p-2 rounded-full w-9 flex items-center justify-center font-bold outline outline-1 bg-opacity-50 shadow-lg">
                {page}
              </button>
              <button
                onClick={() => {
                  handlepageChange(page + 1);
                }}
                className="bg-slate-600 p-2 rounded-full w-9 flex items-center justify-center font-bold"
              >
                {page + 1}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-2/5 flex flex-col gap-2">Loading...</div>
      )}
    </>
  );
};

export default CharactersList;
