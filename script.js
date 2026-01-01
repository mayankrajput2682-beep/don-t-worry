const datePicker = document.getElementById("datePicker");
const planner = document.getElementById("planner");

datePicker.value = new Date().toISOString().split("T")[0];

const TARGETS = ["Lecture","NCERT","Revision","Module","DPP","PYQs"];

const syllabus = {
  Physics: [
    "Units & Measurements",
    "Kinematics",
    "Laws of Motion",
    "Work, Energy & Power",
    "Centre of Mass & Rotation",
    "Gravitation",
    "Thermodynamics",
    "Oscillations & Waves",
    "Electrostatics",
    "Current Electricity",
    "Magnetic Effects",
    "Electromagnetic Induction",
    "Alternating Current",
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
    "Redox Reactions",
    "Organic Chemistry Basics",
    "Hydrocarbons",
    "Solid State",
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "Coordination Compounds",
    "Haloalkanes",
    "Alcohols Phenols Ethers",
    "Aldehydes Ketones",
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
    "Plant Growth & Development",
    "Sexual Reproduction in Plants",
    "Ecosystem",
    "Biodiversity"
  ],

  Zoology: [
    "Animal Kingdom",
    "Structural Organisation",
    "Digestion & Absorption",
    "Breathing & Exchange of Gases",
    "Body Fluids & Circulation",
    "Excretory Products",
    "Neural Control",
    "Endocrine System",
    "Human Reproduction",
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
      const row = document.createElement("div");
      row.className = "row";

      // chapter checkbox
      const chapterKey = `${dateKey}_${subject}_${chapter}_CH`;
      const chChecked = localStorage.getItem(chapterKey) === "true";

      row.innerHTML = `
        <div class="cell-subject"></div>
        <div class="cell-chapter">
          <input type="checkbox" ${chChecked?"checked":""}>
          ${chapter}
        </div>
      `;

      row.querySelector("input").onchange = e => {
        localStorage.setItem(chapterKey, e.target.checked);
      };

      // targets checkboxes
      TARGETS.forEach(target => {
        const tKey = `${dateKey}_${subject}_${chapter}_${target}`;
        const checked = localStorage.getItem(tKey) === "true";

        const cell = document.createElement("div");
        cell.className = "cell-target";
        cell.innerHTML = `<input type="checkbox" ${checked?"checked":""}>`;

        cell.querySelector("input").onchange = e => {
          localStorage.setItem(tKey, e.target.checked);
        };

        row.appendChild(cell);
      });

      block.appendChild(row);
    });

    planner.appendChild(block);
  });
}

datePicker.addEventListener("change", loadPlanner);
loadPlanner();
