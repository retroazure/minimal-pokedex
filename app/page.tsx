"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

const PokemonViewer: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<PokemonData | null>(null);
  const [sprite, setSprite] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(0); // State to hold the total number of Pokémon

  // Fetch total Pokémon count on component mount
  useEffect(() => {
    const fetchTotalPokemonCount = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1");
        setMaxCount(res.data.count); // Set maxCount with the total number of Pokémon
      } catch (error) {
        console.error("Error fetching total Pokémon count:", error);
      }
    };

    fetchTotalPokemonCount();
  }, []);

  // Fetch data for the current Pokémon, count is the same as the id of the pokemon and it will change based on the prev and next buttons
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<PokemonData>(
          `https://pokeapi.co/api/v2/pokemon/${count}`
        );
        setData(res.data);
        setSprite(res.data.sprites.front_default);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchData();
  }, [count]);

  // Increment count but prevent it from going above the max count
  const increment = () => {
    setCount((prevCount) => (prevCount < maxCount ? prevCount + 1 : maxCount));
  };

  // Decrement count but prevent it from going below 1
  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-500 to-pink-500">
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg p-8 shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <div className="bg-green-400 w-4 h-4 rounded-full shadow"></div>
            <div className="bg-yellow-300 w-4 h-4 rounded-full shadow"></div>
            <div className="bg-red-400 w-4 h-4 rounded-full shadow"></div>
          </div>
          <h1 className="text-gray-700 text-3xl font-bold">Pokedex</h1>
        </div>

        {/* Pokemon Image and Name */}
        <div className="bg-gray-200 rounded-lg p-6 text-center border border-gray-300 shadow-inner">
          {data && (
            <>
              <p className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
                {data.name}
              </p>
              {sprite && (
                <img
                  alt={`${data.name} sprite`}
                  src={sprite}
                  className="mx-auto w-32 h-32"
                />
              )}
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={decrement}
            className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transform transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Prev
          </button>
          <button
            onClick={increment}
            className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transform transition-all hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonViewer;