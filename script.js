const datePicker = document.getElementById("datePicker");
const rows = document.querySelectorAll(".row");

// set today date
const today = new Date().toISOString().split("T")[0];
datePicker.value = today;

function loadPlanner() {
  rows.forEach(row => {
    const subject = row.dataset.subject;
    const targetsDiv = row.querySelector(".targets");
    const addBtn = row.querySelector(".addBtn");

    let key = datePicker.value + "_" + subject;
    let tasks = JSON.parse(localStorage.getItem(key)) || [];

    function save() {
      localStorage.setItem(key, JSON.stringify(tasks));
    }

    function render() {
      targetsDiv.innerHTML = "";
      tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
          <label>
            <input type="checkbox" ${task.done ? "checked" : ""}>
            ${task.name}
          </label>
          <button>X</button>
        `;

        div.querySelector("input").addEventListener("change", e => {
          tasks[index].done = e.target.checked;
          save();
        });

        div.querySelector("button").addEventListener("click", () => {
          tasks.splice(index, 1);
          save();
          render();
        });

        targetsDiv.appendChild(div);
      });
    }

    addBtn.onclick = () => {
      const name = prompt("Enter target (PYQ / Chapter / Test)");
      if (name) {
        tasks.push({ name, done:false });
        save();
        render();
      }
    };

    render();
  });
}

datePicker.addEventListener("change", loadPlanner);
loadPlanner();
