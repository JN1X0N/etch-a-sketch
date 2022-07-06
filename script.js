const grid = document.querySelector(".grid");

createGrid(16);
addButtonListener();

function addCellListeners() {
    let rows = document.querySelectorAll(".cell");
    rows.forEach(each => each.addEventListener("mouseover", function(e) {
        let rgb = [];

        if (e.target.getAttribute("data-modified") == "false") {
            for (let i = 0; i < 3; i++) {
                rgb[i] = Math.floor(Math.random() * 256);
            }
        } else {
            let previous = e.target.style.backgroundColor;
            previous = previous.slice(4, -1);
            rgb = previous.split(", ");
            for (let i = 0; i < rgb.length; i++) {
                rgb[i] = Math.floor(Math.max(rgb[i]-(255*0.1), 0));
            }
        }
        e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        e.target.setAttribute("data-modified", "true");
    }));
}

function addButtonListener() {
    let button = document.querySelector("button");
    button.addEventListener("click", function(e) {
        let size = -1;
        while (true) {
            let input = parseInt(prompt("Enter a number between 1 and 100 for your new grid size:"));
            if (isNaN(input)) {
                alert(`${input} is not a valid number!`);
                continue;
            } else if (input <= 0 || input > 100) {
                alert(`${input} is not within the stated bounds!`);
                continue
            }
            size = input;
            break;
        }
        grid.innerHTML = "";
        createGrid(size);
    });
}

function createGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList = `row-${i}`;
        row.style.display = "flex";
        row.style.flexDirection = "row";
        row.style.justifyContent = "center";
        row.style.width = "100%";
        row.style.height = `${100/size}%`;
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList = `row-${i} col-${j} cell`;
            cell.setAttribute("data-modified", "false");
            cell.style.width = `${100/size}%`;
            cell.style.height = `100%`;
            cell.style.backgroundColor = "rgb(255, 255, 255)";
            cell.style.justifyContent = "center";
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    addCellListeners();
}