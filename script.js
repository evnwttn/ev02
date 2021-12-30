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
          "title",
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
            if (box[boxAttribute] === "0") {
              boxDiv.classList.add("null");
            } else if (box[boxAttribute] === "1") {
              boxDiv.classList.add("pre");
            } else if (box[boxAttribute] === "2") {
              boxDiv.classList.add("in-progress");
            } else if (box[boxAttribute] === "3") {
              boxDiv.classList.add("complete");
            }
          }
        });

        const boxSpan = document.createElement("span");
        const textDiv = document.createElement("div");
        if (box.title) {
          const boxText = box.title;
          boxDiv.classList.add("top");
          boxDiv.appendChild(textDiv);
          textDiv.innerHTML = `${boxText}`;
        } else if (box.number) {
          const boxText = box.number;
          boxDiv.appendChild(textDiv);
          textDiv.innerHTML = `${boxText}`;
        } else if (box.workingTitle) {
          const boxText = box.workingTitle;
          boxDiv.appendChild(textDiv);
          textDiv.innerHTML = `${boxText}`;
        }

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
