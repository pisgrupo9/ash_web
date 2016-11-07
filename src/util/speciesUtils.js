export const getSpeciesName = (id, species) => {
  for (let specie of species) {
    if (specie.id == id) {
      return specie.name;
    }
  }
};
