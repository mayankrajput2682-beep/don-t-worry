const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((checkbox, index) => {
    checkbox.checked = localStorage.getItem("task" + index) === "true";

    checkbox.addEventListener("change", () => {
        localStorage.setItem("task" + index, checkbox.checked);
    });
});
