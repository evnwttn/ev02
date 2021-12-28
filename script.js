let container = document.getElementById("container");

class ev02 {
  constructor(rows) {
    this.parentDiv = document.createElement("div");

    rows.forEach((row, index) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("hello");
      this.parentDiv.appendChild(rowDiv);
    });
  }

  /////

  getElement() {
    return this.parentDiv;
  }
}

container.prepend(new ev02(inputData).getElement());
