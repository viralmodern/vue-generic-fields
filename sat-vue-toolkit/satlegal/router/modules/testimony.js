const ListTestimony = () =>
  import(/* webpackChunkName: "ListTestimony" */ "../../views/CAF/Testimony/ListTestimony");

const ListWitness = () =>
  import(/* webpackChunkName: "ListWitness" */ "../../views/CAF/Testimony/ListWitness");

const ListWitnessReliability = () =>
  import(/* webpackChunkName: "ListWitnessReliability" */ "../../views/CAF/Testimony/ListWitnessReliability");

  const ListWitnessSustainability = () =>
  import(/* webpackChunkName: "ListWitnessSustainability" */ "../../views/CAF/Testimony/ListWitnessSustainability");

export default [{
  path: "testimony-list",
  name: "ListTestimony",
  component: ListTestimony,
}, {
  path: "testimony-witness",
  name: "ListWitness",
  component: ListWitness
},
{
  path: "testimony-witness-reliability",
  name: "ListWitnessReliability",
  component: ListWitnessReliability
},
{
  path: "testimony-witness-sustainability",
  name: "ListWitnessSustainability",
  component: ListWitnessSustainability
},
];
