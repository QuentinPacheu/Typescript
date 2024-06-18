// Fait : Tache, supprimer, filtre, catégorie, modifier
// A faire : Rechercher




// Ajoute une nouvelle catégorie
function addCategory(): void {
  const categoryNameInput: HTMLInputElement | null = document.getElementById('categoryName') as HTMLInputElement | null;

  if (categoryNameInput) {
      const categoryName: string = categoryNameInput.value.trim();

      if (categoryName !== "") {
          const newOption: HTMLOptionElement = document.createElement('option');
          newOption.value = categoryName;
          newOption.textContent = categoryName;

          const taskCategorySelect: HTMLSelectElement | null = document.getElementById('taskCategory') as HTMLSelectElement | null;
          
          if (taskCategorySelect) {
              taskCategorySelect.appendChild(newOption);
          }

          categoryNameInput.value = "";
      }
  }
}

// Classe pour gérer les tâches
class TaskManager {
  constructor() {
      const taskForm = document.getElementById("taskForm") as HTMLFormElement;
      taskForm.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  handleFormSubmit(event: Event) {
      event.preventDefault();

      const title = (document.getElementById("taskTitle") as HTMLInputElement).value;
      const description = (document.getElementById("taskDescription") as HTMLTextAreaElement).value;
      const dueDate = (document.getElementById("taskDueDate") as HTMLInputElement).value;
      const priority = (document.getElementById("taskPriority") as HTMLSelectElement).value;

      // créer une tache
      const taskDiv = document.createElement("div");
      taskDiv.className = `task ${priority}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.type = "button";
      deleteButton.addEventListener("click", () => taskDiv.remove()); 


      // modifier
      const editButton = document.createElement("button");
      editButton.textContent = "Modifier";
      editButton.className = "edit-btn";
      editButton.type = "button";

      
      taskDiv.innerHTML = `
          <h3>${title} <span>– Priorité ${priority.charAt(0).toUpperCase() + priority.slice(1)}</span></h3>
          <p>Date d'échéance: ${dueDate}</p>
          <p>${description}</p>
      `;
      taskDiv.appendChild(deleteButton);
      taskDiv.appendChild(editButton);
      document.getElementById("task-list").appendChild(taskDiv);

      (event.target as HTMLFormElement).reset();
  }
}



document.addEventListener("DOMContentLoaded", function () {
  const taskManager = new TaskManager();
});


// filtre
const applyFilterButton: HTMLButtonElement = document.getElementById('applyFilter') as HTMLButtonElement;

applyFilterButton.onclick = () => {
  const priority: string = (document.getElementById('filterPriority') as HTMLSelectElement).value;
  const tasks: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName('task') as HTMLCollectionOf<HTMLDivElement>;

  for (let i = 0; i < tasks.length; i++) {
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
     
      for (let i = 0; i < tasks.length; i++) {
        tasks[i].style.display = "block";
      }
      break;
  }
}; 


// affiché les taches en fonction de laz
function showTasksByPriority(priority: string) {
  let tasks = document.getElementsByClassName(priority) as HTMLCollectionOf<HTMLDivElement>;
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].style.display = "block";
  }
};

