const questInput = document.querySelector("#newTaskInput");
const taskList = document.querySelector(".items");

const taskCounterEl = document.querySelector("#items-left");
let taskCounter = 0;
const updateTaskCounter = () => {
  taskCounterEl.textContent = taskCounter + " items left";
};

const clearCompleted = document.querySelector("#clear-completed");
const filterArr = document.querySelectorAll(".filter-option");

const changeColor = document.querySelector("#changeColor");

questInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const templateCopy = document
    .querySelector("template")
    .content.cloneNode(true);

  const completeCbx = templateCopy.querySelector(".completeCbx");
  const deleteTask = templateCopy.querySelector(".deleteItem");
  const taskText = templateCopy.querySelector("p");
  const task = templateCopy.querySelector(".questItem");

  taskText.textContent = questInput.value;

  completeCbx.addEventListener("click", () => {
    completeCbx.classList.toggle("selCbx");
    completeCbx.classList.toggle("completeCbx");
    if (completeCbx.classList.contains("selCbx")) {
      completeCbx.name = "checkmark";
      taskText.style.setProperty("text-decoration", "line-through");
      task.classList.add("completed");
      taskCounter--;
      updateTaskCounter();
    } else {
      completeCbx.name = "ellipse-outline";
      taskText.style.setProperty("text-decoration", "none");
      task.classList.remove("completed");
      taskCounter++;
      updateTaskCounter();
    }
  });

  deleteTask.addEventListener("click", () => {
    task.remove();
    if (!task.classList.contains("completed")) {
      taskCounter--;
      updateTaskCounter();
    }
  });

  filterArr.forEach((el) => {
    if (
      el.classList.contains("selected-filter") &&
      el.textContent == "Completed"
    ) {
      task.classList.add("hidden");
    }
  });

  taskList.appendChild(templateCopy);
  questInput.value = "";
  taskCounter++;
  updateTaskCounter();
});

clearCompleted.addEventListener("click", () => {
  const completedTaskList = document.querySelectorAll(".completed");
  completedTaskList.forEach((task) => {
    task.remove();
  });
});

filterArr.forEach((filter) => {
  filter.addEventListener("click", () => {
    const allTasks = document.querySelectorAll(".questItem");

    filterArr.forEach((el) => {
      el.classList.remove("selected-filter");
    });
    filter.classList.add("selected-filter");

    allTasks.forEach((item) => {
      item.classList.add("hidden");
    });

    if (filter.textContent == "All") {
      allTasks.forEach((item) => {
        item.classList.remove("hidden");
      });
      console.log(allTasks);
    } else if (filter.textContent == "Active") {
      allTasks.forEach((item) => {
        if (!item.classList.contains("completed")) {
          item.classList.remove("hidden");
        }
      });
      console.log(allTasks);
    } else {
      allTasks.forEach((item) => {
        if (item.classList.contains("completed")) {
          item.classList.remove("hidden");
        }
      });
      console.log(allTasks);
    }
  });
});

const changeTheme = (theme) => {
  const rootNode = document.documentElement;
  const imgContainer = document.querySelector(".img-sec");
  rootNode.classList.toggle("light");
  if (theme === "light") {
    imgContainer.style.setProperty(
      "background-image",
      "url(images/bg-desktop-light.jpg)"
    );
  } else {
    imgContainer.style.setProperty(
      "background-image",
      "url(images/bg-desktop-dark.jpg)"
    );
  }
};

changeColor.addEventListener("click", () => {
  if (changeColor.name === "sunny") {
    changeColor.name = "moon";
    changeTheme("light");
  } else {
    changeColor.name = "sunny";
    changeTheme("dark");
  }
});
