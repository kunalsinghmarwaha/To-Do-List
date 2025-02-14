const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

gsap.from(".container", { opacity: 0, y: -50, duration: 1, ease: "power2.out" });
gsap.from(".todo-app h2", { opacity: 0, scale: 0.5, duration: 1, delay: 0.5, ease: "back.out(1.7)" });

function addTask() {
    if (inputBox.value === '') {
        alert("The text box is empty, write something !");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        gsap.from(li, { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" });

        saveData();
    }
    inputBox.value = "";
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {  
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        gsap.to(e.target, { opacity: e.target.classList.contains("checked") ? 0.5 : 1, duration: 0.3 });

        saveData();
    } else if (e.target.tagName === "SPAN") {
        let parentLi = e.target.parentElement;

        gsap.to(parentLi, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                parentLi.remove();
                saveData();
            }
        });
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayData() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    document.querySelectorAll("li").forEach((li) => {
        gsap.from(li, { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" });
    });
}
displayData();
