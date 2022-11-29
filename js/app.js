// select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

// variables
let LIST = [];
let id = 0;

//get item from the localStroage
let data = localStorage.getItem("TODO");

//load list to the user's  interface
const loadList = (array) => {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
};

//checking if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST); //load list to the user interface
  // console.log(id);
} else {
  LIST = [];
  id = 0;
}

//clar localStorage
clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? check : uncheck;
  const LINE = done ? line_through : " ";

  const item = ` <li class="item">
  <i class="fa ${DONE} co" job="complete" id=${id}></i>
  <p class="text  ${LINE}">${toDo}</p>
  <i class="fa fa-trash-o de" job="delete" id=${id}></i>
</li>`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add item to the to do using the enter key
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    const toDo = input.value;

    //if input is empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST)); //add item from the localStroage
      id++;
    }
    input.value = " ";
  }
});

//complete to do
const completeToDo = (element) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(line_through);

  LIST[element.id].done = LIST[element.id].done ? fasle : true;
};

//remove to do
const removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
};

// target items created
list.addEventListener("click", (event) => {
  const element = event.target; //return the clicked element inside the list element
  const elementJob = element.attributes.job.value; // returns complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST)); //add item from the localStroage
});
