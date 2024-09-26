// PokemonViewer.tsx
"use client";
import React, { useEffect, useState } from "react";
import usePokemon from "./component/usePokemon"; // Import custom hook
import Button from "./component/Button"; // Import Button component

const PokemonViewer: React.FC = () => {
  const { setCount, data, sprite, maxCount } = usePokemon(1); // Initialize hook with starting count of 1
  const [isThrottled, setIsThrottled] = useState(false); // State to manage throttling

  // Combined keydown event handler
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isThrottled) return; // Prevent action if throttled

    if (event.key === "ArrowRight" || event.keyCode === 39) {
      console.log("Right arrow pressed");
      increment(); // Call increment function
    } else if (event.key === "ArrowLeft" || event.keyCode === 37) {
      console.log("Left arrow pressed");
      decrement(); // Call decrement function
    }

    // Set throttle state and reset after 50ms
    setIsThrottled(true);
    setTimeout(() => setIsThrottled(false), 50); // Adjust the duration as needed
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThrottled]);

  const increment = () => {
    setCount((prevCount) => {
      const newCount = Math.min(prevCount + 1, maxCount); // Ensure count does not exceed maxCount
      console.log(`Incremented count: ${newCount}`); // Log the incremented count
      return newCount;
    });
  };

  const decrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 1); // Decrement and ensure it doesn't go below 1
      console.log(`Decremented count: ${newCount}`); // Log the decremented count
      return newCount;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-500 to-pink-500">
      <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg p-8 shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-gray-700 text-3xl font-bold">Pokedex</h1>
        </div>

        <div className="bg-gray-200 rounded-lg p-6 text-center border border-gray-300 shadow-inner">
          {data ? (
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
          ) : (
            <p className="text-gray-800">Loading...</p>
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
