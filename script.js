const buttonTask = document.querySelector("#add-task");
const inputE = document.querySelector("#task-value");
let task;

// try  to get the input value
buttonTask.addEventListener("click", (e) => {
  const inputE = document.querySelector("#task-value");
  addTask(inputE.value);
  inputE.value = "";
});

const enter = (e) => {
  if (e.keyCode === 13) {
    addTask(e.target.value);
    e.target.value = "";
  }
};
inputE.addEventListener("keyup", enter);

// <li class="task fill" draggable="true">
// <div class="task-content">Write the weekly note</div>
// <div class="trash">&times;</div>
// </li>
function addTask(taskValue) {
  // Create li
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.classList.add("fill");
  newTask.setAttribute("draggable", "true");
  newTask.addEventListener("dragstart", dragStart);
  newTask.addEventListener("dragend", dragEnd);

  // Create div inside li
  const taskContent = document.createElement("div");
  const trash = document.createElement("div");
  const edit = document.createElement("div");
  taskContent.classList.add("task-content");
  trash.classList.add("trash");
  trash.innerHTML = "&times;";
  trash.addEventListener("click", removeTask);
  edit.innerText = "E";

  // Set the text of div task-content
  taskContent.innerText = taskValue;

  // Add the taskContent (div) into new Task (li)
  newTask.appendChild(taskContent);
  newTask.appendChild(trash);
  newTask.appendChild(edit);

  //

  //Add the whole li div into ul
  const tasks = document.getElementById("tasks-added");
  //console.dir(tasks);
  //tasks.insert(newTask, tasks.childNodes[0]);
  //tasks.appendChild(newTask);
  // console.log(tasks.childNodes[1]);
  // console.log(tasks.childNodes[0]);
  tasks.appendChild(newTask);

  //anonymus function
  edit.addEventListener("click", () => {
    editTask(taskContent);
  });
}

const editTask = (taskContent) => {
  let abc = "Haha";
  taskContent.innerHTML =
    '<input class="newInput" type="text" value="' +
    taskContent.innerText +
    '">'; ///template literal
  const newContent = document.querySelector(".newInput");
  console.log(newContent);
  newContent.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      taskContent.innerText = newContent.value;
    }
  });
};

function dragStart(e) {
  e.target.classList.add("hold");
  //ngam cuu
  task = e.target;
  setTimeout(function () {
    e.target.classList.add("invisible");
  }, 0);
}

const dragEnd = (e) => {
  e.target.classList.remove("invisible");
};
//<ul>
// <li class="task fill" draggable="true">
// <div class="task-content">Write the weekly note</div>
// <div class="trash">&times;</div>
// </li>
// </ul>
const removeTask = (e) => {
  // event represents the remove button
  // Access the <ul> list by moving 2 levels up
  const tasks = e.target.parentNode.parentNode;
  const task = e.target.parentNode;
  tasks.removeChild(task);
};

function dragEnter(event) {
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.add("hovered");
  }
}

function dragOver(event) {
  event.preventDefault(); // https://stackoverflow.com/a/35428657
}

function dragLeave(event) {
  event.target.classList.remove("hovered");
}

function dragDrop(event) {
  event.target.classList.remove("hovered");
  // event represents the column
  // Add the task to the right child. Inspect the element to find the ul is index 3 in childnodes.
  event.target.childNodes[3].append(task);
}

var dropzones = document.getElementsByClassName("dropzone");

for (var index = 0; index < dropzones.length; index++) {
  const dropzone = dropzones[index];
  dropzone.addEventListener("dragenter", dragEnter);
  dropzone.addEventListener("dragover", dragOver);
  dropzone.addEventListener("dragleave", dragLeave);
  dropzone.addEventListener("drop", dragDrop);
}
