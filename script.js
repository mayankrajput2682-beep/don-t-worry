const datePicker = document.getElementById("datePicker");
const rows = document.querySelectorAll(".row");

datePicker.value = new Date().toISOString().split("T")[0];

function loadPlanner() {
  rows.forEach(row => {
    const subject = row.dataset.subject;
    const chaptersDiv = row.querySelector(".chapters");
    const targetsDiv = row.querySelector(".targets");
    const addChapterBtn = row.querySelector(".addChapterBtn");

    const key = datePicker.value + "_" + subject;
    let data = JSON.parse(localStorage.getItem(key)) || [];

    function save() {
      localStorage.setItem(key, JSON.stringify(data));
    }

    function render() {
      chaptersDiv.innerHTML = "";
      targetsDiv.innerHTML = "";

      data.forEach((chapter, cIndex) => {
        const chDiv = document.createElement("div");
        chDiv.className = "chapter";
        chDiv.innerHTML = `
          <input type="checkbox" ${chapter.done ? "checked" : ""}>
          <strong>${chapter.name}</strong>
        `;

        chDiv.querySelector("input").addEventListener("change", e => {
          data[cIndex].done = e.target.checked;
          save();
        });

        chDiv.addEventListener("click", () => showTargets(cIndex));

        chaptersDiv.appendChild(chDiv);
      });
    }

    function showTargets(index) {
      targetsDiv.innerHTML = "";
      data[index].tasks.forEach((task, tIndex) => {
        const tDiv = document.createElement("div");
        tDiv.className = "task";
        tDiv.innerHTML = `
          <input type="checkbox" ${task.done ? "checked" : ""}>
          ${task.name}
          <button>X</button>
        `;

        tDiv.querySelector("input").addEventListener("change", e => {
          task.done = e.target.checked;
          save();
        });

        tDiv.querySelector("button").addEventListener("click", () => {
          data[index].tasks.splice(tIndex, 1);
          save();
          showTargets(index);
        });

        targetsDiv.appendChild(tDiv);
      });

      const addTaskBtn = document.createElement("button");
      addTaskBtn.textContent = "+ Target";
      addTaskBtn.onclick = () => {
        const name = prompt("Enter target (PYQ / Module / NCERT)");
        if (name) {
          data[index].tasks.push({ name, done:false });
          save();
          showTargets(index);
        }
      };
      targetsDiv.appendChild(addTaskBtn);
    }

    addChapterBtn.onclick = () => {
      const name = prompt("Enter Chapter Name");
      if (name) {
        data.push({ name, done:false, tasks:[] });
        save();
        render();
      }
    };

    render();
  });
}

datePicker.addEventListener("change", loadPlanner);
loadPlanner();
