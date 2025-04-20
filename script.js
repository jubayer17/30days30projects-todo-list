const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let currentEdit = null;

function addTask() {
  const task = inputBox.value.trim();

  if (task === "") {
    alert("You must write something");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = task;

  const editBtn = document.createElement("span");
  editBtn.innerHTML = "✏️";
  editBtn.className = "edit-btn";

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "×";
  closeBtn.className = "close";

  li.appendChild(editBtn);
  li.appendChild(closeBtn);
  listContainer.appendChild(li);

  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI" && !e.target.classList.contains("editing")) {
      e.target.classList.toggle("checked");
      saveData();
    } else if (
      e.target.tagName === "SPAN" &&
      e.target.classList.contains("close")
    ) {
      e.target.parentElement.remove();
      saveData();
    } else if (
      e.target.tagName === "SPAN" &&
      e.target.classList.contains("edit-btn")
    ) {
      if (currentEdit) return;

      currentEdit = e.target.parentElement;
      inputBox.value = currentEdit.firstChild.textContent.trim();
      currentEdit.classList.add("editing");
      document.querySelector(".update-btn").style.display = "inline";
    }
  },
  false
);

document.querySelector(".update-btn").addEventListener("click", () => {
  if (currentEdit) {
    currentEdit.firstChild.textContent = inputBox.value.trim(); // Update the task text
    currentEdit.classList.remove("editing"); // Remove editing class
    currentEdit = null; // Reset edit state
    document.querySelector(".update-btn").style.display = "none"; // Hide "Edit" button
    inputBox.value = ""; // Clear the input box
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showData();
