const $ = document.querySelector.bind(document);
const $$ = (selector) => [
  ...document.querySelectorAll.bind(document)(selector),
];
const input = $(".input-value");
const btnAdd = $(".btn-add");
const list = $(".list");

const items = $$(".item");
const btnDelete = $$(".btn-delete");

const storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => localStorage.getItem(key),
  remove: (key) => localStorage.removeItem(key),
};

const TODO_LIST_KEY = "TODO_LIST";

const dataStorage = JSON.parse(storage.get(TODO_LIST_KEY));

const totoList = dataStorage || [];
list.innerHTML = renderAllItem(totoList);
handleClickTodoItem();
handleDeleteItem();

btnAdd.addEventListener("click", function () {
  totoList.push({
    title: input.value,
    isCompleted: false,
  });
  console.log(totoList);
  storage.set(TODO_LIST_KEY, totoList);
  input.value = "";
  input.focus();
  list.innerHTML = renderAllItem(totoList);
  handleClickTodoItem();
  handleDeleteItem();
});

function renderTodoItem(item) {
  return `
  <div class="item ${item.isCompleted ? "completed" : ""}">
    <span>${item.title}</span
    ><button class="btn-delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
  `;
}

function renderAllItem(totoList) {
  if (totoList.length === 0) {
    return "No todo list";
  }

  let resultHtml = ``;
  for (let i = 0; i < totoList.length; i++) {
    const item = totoList[i];
    resultHtml += renderTodoItem(item);
  }
  return resultHtml;
}

function handleClickTodoItem() {
  const items = $$(".item");
  items.forEach((item, index) => {
    item.onclick = () => {
      item.classList.toggle("completed");
      const isCompleted = item.className.includes("completed");
      console.log(isCompleted);
      handleSetCompleted(index, isCompleted);
    };
  });
}

function handleSetCompleted(index, isCompleted) {
  const data = JSON.parse(storage.get(TODO_LIST_KEY));
  data[index].isCompleted = isCompleted;
  storage.set(TODO_LIST_KEY, data);
}

function deleteItem(index) {
  const data = JSON.parse(storage.get(TODO_LIST_KEY)) || [];
  data.splice(index, 1);
  totoList.splice(index, 1);
  storage.set(TODO_LIST_KEY, data);
}
function handleDeleteItem() {
  const btnDelete = $$(".btn-delete");
  btnDelete.forEach((btn, index) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      deleteItem(index);
      list.innerHTML = renderAllItem(totoList);
      handleClickTodoItem();
      handleDeleteItem();
    };
  });
}
