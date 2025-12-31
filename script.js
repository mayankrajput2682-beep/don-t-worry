const datePicker = document.getElementById("datePicker");
const planner = document.getElementById("planner");

datePicker.value = new Date().toISOString().split("T")[0];

const syllabus = {
  Physics: [
    "Units & Measurements",
    "Kinematics",
    "Laws of Motion",
    "Work Energy Power",
    "Centre of Mass",
    "Rotational Motion",
    "Gravitation",
    "Thermodynamics",
    "Oscillations",
    "Waves",
    "Electrostatics",
    "Current Electricity",
    "Magnetism",
    "Electromagnetic Induction",
    "AC",
    "Ray Optics",
    "Wave Optics",
    "Dual Nature",
    "Atoms & Nuclei",
    "Semiconductors"
  ],

  Chemistry: [
    "Some Basic Concepts",
    "Structure of Atom",
    "Periodic Table",
    "Chemical Bonding",
    "Thermodynamics",
    "Equilibrium",
    "Redox",
    "Organic Basics",
    "Hydrocarbons",
    "Solid State",
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "Coordination Compounds",
    "Haloalkanes",
    "Alcohol Phenol Ether",
    "Aldehyde Ketone",
    "Biomolecules"
  ],

  Botany: [
    "Living World",
    "Biological Classification",
    "Plant Kingdom",
    "Morphology of Flowering Plants",
    "Anatomy of Flowering Plants",
    "Photosynthesis",
    "Respiration in Plants",
    "Plant Growth",
    "Sexual Reproduction in Plants",
    "Ecosystem",
    "Biodiversity",
    "Plant Physiology"
  ],

  Zoology: [
    "Animal Kingdom",
    "Structural Organisation in Animals",
    "Digestion",
    "Breathing",
    "Circulation",
    "Excretion",
    "Neural Control",
    "Endocrine System",
    "Reproduction in Humans",
    "Genetics",
    "Evolution",
    "Human Health & Disease"
  ]
};

function loadPlanner(){
  planner.innerHTML = "";
  const dateKey = datePicker.value;

  Object.keys(syllabus).forEach(subject => {
    const block = document.createElement("div");
    block.className = "subject-block";

    block.innerHTML = `<div class="subject-title">${subject}</div>`;

    syllabus[subject].forEach(chapter => {
      const key = `${dateKey}_${subject}_${chapter}`;
      const checked = localStorage.getItem(key) === "true";

      const row = document.createElement("div");
      row.className = "chapter-row";
      row.innerHTML = `
        <div class="chapter-name">${chapter}</div>
        <div class="chapter-check">
          <input type="checkbox" ${checked ? "checked" : ""}>
        </div>
      `;

      row.querySelector("input").addEventListener("change", e => {
        localStorage.setItem(key, e.target.checked);
      });

      block.appendChild(row);
    });

    planner.appendChild(block);
  });
}

datePicker.addEventListener("change", loadPlanner);
loadPlanner();
