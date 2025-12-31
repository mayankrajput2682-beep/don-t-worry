const rows = document.querySelectorAll(".row");

rows.forEach(row => {
  const subject = row.dataset.subject;
  const targetsDiv = row.querySelector(".targets");
  const addBtn = row.querySelector(".addBtn");

  let tasks = JSON.parse(localStorage.getItem(subject)) || [];

  function save() {
    localStorage.setItem(subject, JSON.stringify(tasks));
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

  addBtn.addEventListener("click", () => {
    const name = prompt("Enter Target (PYQ, Module, Chapter etc.)");
    if (name) {
      tasks.push({ name, done:false });
      save();
      render();
    }
  });

  render();
});
