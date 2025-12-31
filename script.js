const datePicker = document.getElementById("datePicker");
const rows = document.querySelectorAll(".row");

datePicker.value = new Date().toISOString().split("T")[0];

function loadPlanner() {
  rows.forEach(row => {
    const subject = row.dataset.subject;
    const chaptersDiv = row.querySelector(".chapters");
    const targetsDiv = row.querySelector(".targets");
    const addChapterBtn = row.querySelector(".addChapterBtn");

    const storageKey = datePicker.value + "_" + subject;
    let data = JSON.parse(localStorage.getItem(storageKey)) || [];
    let activeChapterIndex = null;

    function save() {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function renderChapters() {
      chaptersDiv.innerHTML = "";

      data.forEach((chapter, index) => {
        const chDiv = document.createElement("div");
        chDiv.className = "chapter";
        chDiv.style.cursor = "pointer";
        chDiv.innerHTML = `
          <input type="checkbox" ${chapter.done ? "checked" : ""}>
          <strong>${chapter.name}</strong>
        `;

        chDiv.querySelector("input").addEventListener("change", e => {
          data[index].done = e.target.checked;
          save();
        });

        chDiv.addEventListener("click", () => {
          activeChapterIndex = index;
          renderTargets();
        });

        chaptersDiv.appendChild(chDiv);
      });
    }

    function renderTargets() {
      targetsDiv.innerHTML = "";

      if (activeChapterIndex === null) {
        targetsDiv.innerHTML = "<p>Select a chapter to see targets</p>";
        return;
      }

      const chapter = data[activeChapterIndex];

      chapter.tasks.forEach((task, tIndex) => {
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
          chapter.tasks.splice(tIndex, 1);
          save();
          renderTargets();
        });

        targetsDiv.appendChild(tDiv);
      });

      const addTaskBtn = document.createElement("button");
      addTaskBtn.textContent = "+ Target";
      addTaskBtn.onclick = () => {
        const name = prompt("Enter target (PYQ / Module / NCERT)");
        if (name) {
          chapter.tasks.push({ name, done: false });
          save();
          renderTargets();
        }
      };

      targetsDiv.appendChild(addTaskBtn);
    }

    addChapterBtn.onclick = () => {
      const name = prompt("Enter Chapter Name");
      if (name) {
        data.push({ name, done: false, tasks: [] });
        save();
        renderChapters();
      }
    };

    renderChapters();
    renderTargets();
  });
}

datePicker.addEventListener("change", loadPlanner);
loadPlanner();
