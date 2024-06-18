// Fait : Tache, supprimer, filtre, catégorie, modifier
// A faire : Rechercher
// Ajoute une nouvelle catégorie
function addCategory() {
    var categoryNameInput = document.getElementById('categoryName');
    if (categoryNameInput) {
        var categoryName = categoryNameInput.value.trim();
        if (categoryName !== "") {
            var newOption = document.createElement('option');
            newOption.value = categoryName;
            newOption.textContent = categoryName;
            var taskCategorySelect = document.getElementById('taskCategory');
            if (taskCategorySelect) {
                taskCategorySelect.appendChild(newOption);
            }
            categoryNameInput.value = "";
        }
    }
}
// Classe pour gérer les tâches
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        var taskForm = document.getElementById("taskForm");
        taskForm.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    TaskManager.prototype.handleFormSubmit = function (event) {
        event.preventDefault();
        var title = document.getElementById("taskTitle").value;
        var description = document.getElementById("taskDescription").value;
        var dueDate = document.getElementById("taskDueDate").value;
        var priority = document.getElementById("taskPriority").value;
        // créer une tache
        var taskDiv = document.createElement("div");
        taskDiv.className = "task ".concat(priority);
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function () { return taskDiv.remove(); });
        // modifier
        var editButton = document.createElement("button");
        editButton.textContent = "Modifier";
        editButton.className = "edit-btn";
        editButton.type = "button";
        taskDiv.innerHTML = "\n          <h3>".concat(title, " <span>\u2013 Priorit\u00E9 ").concat(priority.charAt(0).toUpperCase() + priority.slice(1), "</span></h3>\n          <p>Date d'\u00E9ch\u00E9ance: ").concat(dueDate, "</p>\n          <p>").concat(description, "</p>\n      ");
        taskDiv.appendChild(deleteButton);
        taskDiv.appendChild(editButton);
        document.getElementById("task-list").appendChild(taskDiv);
        event.target.reset();
    };
    return TaskManager;
}());
document.addEventListener("DOMContentLoaded", function () {
    var taskManager = new TaskManager();
});
// filtre
var applyFilterButton = document.getElementById('applyFilter');
applyFilterButton.onclick = function () {
    var priority = document.getElementById('filterPriority').value;
    var tasks = document.getElementsByClassName('task');
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].style.display = "none";
    }
    switch (priority) {
        case "high":
            showTasksByPriority('Haute');
            break;
        case "low":
            showTasksByPriority('Faible');
            break;
        case "medium":
            showTasksByPriority('Moyenne');
            break;
        default:
            for (var i = 0; i < tasks.length; i++) {
                tasks[i].style.display = "block";
            }
            break;
    }
};
// affiché les taches en fonction de laz
function showTasksByPriority(priority) {
    var tasks = document.getElementsByClassName(priority);
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].style.display = "block";
    }
}
;
