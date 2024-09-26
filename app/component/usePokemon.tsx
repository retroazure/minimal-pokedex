import { useState, useEffect } from "react";
import axios from "axios";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

const usePokemon = (initialCount = 1) => {
  const [count, setCount] = useState<number>(initialCount);
  const [data, setData] = useState<PokemonData | null>(null);
  const [sprite, setSprite] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);

  useEffect(() => {
    const fetchTotalPokemonCount = async () => {
      try {
        const countRes = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=0"
        ); // Fetch all Pokémon to get count
        setMaxCount(countRes.data.count);
      } catch (error) {
        console.error("Error fetching total Pokémon count:", error);
      }
    };

    fetchTotalPokemonCount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (count < 1 || count > maxCount) return;
      try {
        const res = await axios.get<PokemonData>(
          `https://pokeapi.co/api/v2/pokemon/${count}`
        );
        setData(res.data);
        setSprite(res.data.sprites.front_default);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setData(null); // Reset data on error
      }
    };

    fetchData();
  }, [count, maxCount]);

  return { count, setCount, data, sprite, maxCount };
};

export default usePokemon;
