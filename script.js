const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const sortBtn = document.getElementById("sortBtn");
const sortDateBtn = document.getElementById("sortDateBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let tasks = [];

// render function
function render() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.selected || false;
        checkbox.onchange = () => {
            tasks[index].selected = checkbox.checked;
        };

        const span = document.createElement("span");
        span.textContent = task.text;

        const dateSpan = document.createElement("div");
        dateSpan.classList.add("date");
        dateSpan.textContent = "Added: " + new Date(task.date).toLocaleString();

        const actions = document.createElement("div");
        actions.classList.add("actions");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            const newWord = prompt("Enter new word:", task.text);
            if (newWord) {
                tasks[index].text = newWord.trim();
                render();
            }
        };

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            render();
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);
        li.appendChild(dateSpan);
        taskList.appendChild(li);
    });
}

// Add button
addBtn.onclick = () => {
    const value = input.value.trim();
    if (value) {
        tasks.push({ text: value, date: new Date().toISOString(), selected: false });
        input.value = "";
        render();
    }
};

// Sort button (alphabetically)
sortBtn.onclick = () => {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    render();
};

// Sort button (by date)
sortDateBtn.onclick = () => {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    render();
};

// Delete selected
deleteSelectedBtn.onclick = () => {
    tasks = tasks.filter(task => !task.selected);
    render();
};

// Delete all
deleteAllBtn.onclick = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        render();
    }
};