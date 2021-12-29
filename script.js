let container = document.getElementById("container");

class ev02 {
  constructor(rows) {
    this.parentDiv = document.createElement("div");

    rows.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      row.forEach((box) => {
        const boxDiv = document.createElement("div");
        boxDiv.classList.add("box");

        const boxAttributes = [
          "number",
          "workingTitle",
          "demo",
          "guitar",
          "bass",
          "drums",
          "synths",
          "fx",
          "mix",
          "master",
          "done",
        ];

        boxAttributes.forEach((boxAttribute) => {
          if (box[boxAttribute]) {
            const attributeName = boxAttribute
              .match(/\w?[^A-Z]*/g)
              .slice(0, -1)
              .map((s) => s.toLowerCase())
              .join("-");
            boxDiv.setAttribute(`data-${attributeName}`, box[boxAttribute]);
          }
        });

        const boxSpan = document.createElement("span");
        if (box.number) {
          const textDiv = document.createElement("div");
          const boxText = box.number;
          boxDiv.appendChild(textDiv);
          textDiv.innerHTML = `${boxText}`;
        }

        rowDiv.appendChild(boxDiv);
        console.log(boxDiv);
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
