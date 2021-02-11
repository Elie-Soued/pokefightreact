import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ViewPokemonInfo = ({}) => {
  const { id, info } = useParams();
  // const { pokeArray, setPokeArray } = useParams([]);
  let [pokeInfo, setPokeInfo] = useState(null);
  let [pokeInfo2, setPokeInfo2] = useState(null);

  const getPokeInfo = async () => {
    await axios
      .get(`http://localhost:3000/pokemon/${id}/${info}`)
      .then((res) => {
        let pokeLength = Object.values(res.data).length;
        let pokeValues = [];
        let pokeKeys = [];
        for (let i = 0; i < pokeLength; i++) {
          pokeValues.push(Object.values(res.data)[i]);
        }
        setPokeInfo(pokeValues);

        for (let i = 0; i < pokeLength; i++) {
          pokeKeys.push(Object.keys(res.data)[i]);
        }
        setPokeInfo2(pokeKeys);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => getPokeInfo(), []);

  return (
    <div>
      <h1>{info}</h1>

      {pokeInfo !== null && pokeInfo2 !== null ? (
        pokeInfo.map((iteration, index) => (
          <p>
            {pokeInfo2[index]}: {iteration}
          </p>
        ))
      ) : (
        <p>Still loading?</p>
      )}
    </div>
  );
};

export default ViewPokemonInfo;
