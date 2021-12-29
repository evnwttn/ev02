let container = document.getElementById("container");

class ev02 {
  constructor(rows) {
    this.parentDiv = document.createElement("div");

    rows.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      row.forEach((box) => {
        const boxDiv = document.createElement("div");
        boxDiv.setAttribute("data-number", box.number);
        boxDiv.setAttribute("data-working-title", box.workingTitle);
        boxDiv.setAttribute("data-demo", box.demo);
        boxDiv.setAttribute("data-guitar", box.guitar);
        boxDiv.setAttribute("data-bass", box.bass);
        boxDiv.setAttribute("data-drums", box.drums);
        boxDiv.setAttribute("data-synths", box.synths);
        boxDiv.setAttribute("data-fx", box.fx);
        boxDiv.setAttribute("data-mix", box.mix);
        boxDiv.setAttribute("data-master", box.master);
        boxDiv.setAttribute("data-done", box.done);
        boxDiv.classList.add("box");

        const boxSpan = document.createElement("span");

        rowDiv.appendChild(boxDiv);
      });

      this.parentDiv.appendChild(rowDiv);
    });
  }

  /////

  getElement() {
    return this.parentDiv;
  }
}

container.prepend(new ev02(inputData).getElement());
