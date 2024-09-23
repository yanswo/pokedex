const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

function fetchPokemonDetails(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("pokemonName").innerText = data.name;
      document.getElementById("pokemonId").innerText = `#${data.id}`;
      document.getElementById("pokemonImage").src =
        data.sprites.other.dream_world.front_default;
      document.getElementById("pokemonSpecies").innerText = data.species.name;
      document.getElementById("pokemonHeight").innerText = `${
        data.height / 10
      } m`;
      document.getElementById("pokemonWeight").innerText = `${
        data.weight / 10
      } kg`;
      document.getElementById("pokemonAbilities").innerText = data.abilities
        .map((a) => a.ability.name)
        .join(", ");

      const types = data.types.map((typeSlot) => typeSlot.type.name);
      const [primaryType] = types;

      const detailSection = document.querySelector(".detailPokemon");
      detailSection.classList.add(primaryType);

      const statsList = document.getElementById("pokemonStats");
      statsList.innerHTML = "";

      data.stats.forEach((stat) => {
        const li = document.createElement("li");
        li.innerText = `${stat.stat.name}: ${stat.base_stat}`;
        statsList.appendChild(li);
      });

      const movesList = document.getElementById("pokemonMoves");
      movesList.innerHTML = "";

      data.moves.forEach((move) => {
        const li = document.createElement("li");
        li.innerText = move.move.name;
        movesList.appendChild(li);
      });
    });
}

fetchPokemonDetails(pokemonId);
