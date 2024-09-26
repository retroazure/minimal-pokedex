"use client";
import React, { useEffect, useState } from "react";
import usePokemon from "./component/usePokemon"; // Import custom hook
import Button from "./component/Button"; // Import Button component

const PokemonViewer: React.FC = () => {
  const { setCount, data, sprite, maxCount } = usePokemon(1);
  const [isThrottled, setIsThrottled] = useState(false);
  const [firstPress, setFirstPress] = useState(true);

  // Combined keydown event handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isThrottled) return;

    if (event.key === "ArrowRight" || event.keyCode === 39) {
      if (firstPress) {
        setCount(2);
        setFirstPress(false);
      } else {
        increment();
      }
    } else if (event.key === "ArrowLeft" || event.keyCode === 37) {
      decrement();
    }

    setIsThrottled(true);
    setTimeout(() => setIsThrottled(false), 50);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThrottled, firstPress]);

  const increment = () => {
    setCount((prevCount) => Math.min(prevCount + 1, maxCount));
  };

  const decrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pokedexRed via-red-400 to-pink-400">
      <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-gray-800 text-4xl font-bold font-sans">
            Pokedex
          </h1>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 shadow-inner">
          {data ? (
            <>
              <p className="text-3xl font-semibold text-gray-900 mb-4 capitalize font-sans">
                {data.name}
              </p>
              {sprite && (
                <img
                  alt={`${data.name} sprite`}
                  src={sprite}
                  className="mx-auto w-32 h-32 hover:scale-110 transition-transform"
                />
              )}
            </>
          ) : (
            <p className="text-gray-700">Loading...</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={decrement}>Prev</Button>
          <Button onClick={increment}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default PokemonViewer;
