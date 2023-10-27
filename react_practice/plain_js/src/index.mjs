// import "./styles.css";


const onClickAdd = () => {
    const inputText = document.getElementById("add-text").value;
    document.getElementById("add-text").value = "";

    createImcompleteList(inputText);
};

const deleteFromImcompleteList = (target) => {
    document.getElementById("imcomplete-list").removeChild(target);

};

const createImcompleteList = (text) => {

    const div = document.createElement("div");
    div.className = "list-row";

    const li = document.createElement("li");
    li.innerText = text;

    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    completeButton.addEventListener("click", () => {

        deleteFromImcompleteList(completeButton.parentNode);

        const addTarget = completeButton.parentNode;
        const text = addTarget.firstElementChild.innerText;

        addTarget.textContent = null;
        const li = document.createElement("li");
        li.innerText = text;
        const backButton = document.createElement("button");
        backButton.innerText = "戻す";
        backButton.addEventListener("click", () => {
            const deleteTarget = backButton.parentNode;
            document.getElementById("complete-list").removeChild(deleteTarget);

            const text = backButton.parentNode.firstElementChild.innerText;
            createImcompleteList(text);
        });
        addTarget.appendChild(li);
        addTarget.appendChild(backButton);
        document.getElementById("complete-list").appendChild(addTarget);

    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click", () => {
        deleteFromImcompleteList(deleteButton.parentNode);

    });

    div.appendChild(li);
    div.appendChild(completeButton);
    div.appendChild(deleteButton);

    document.getElementById("imcomplete-list").appendChild(div);

};

document
    .getElementById("add-button")
    .addEventListener("click", () => onClickAdd());