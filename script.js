let container = document.getElementById("container");

class ev02 {
  constructor(rows) {
    this.parentDiv = document.createElement("div");

    rows.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      row.forEach((box) => {
        const boxDiv = document.createElement("div");

        const optionalAttributes = [
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

        optionalAttributes.forEach((optionalAttribute) => {
          if (box[optionalAttribute]) {
            const attributeName = optionalAttribute
              .match(/\w?[^A-Z]*/g)
              .slice(0, -1)
              .map((s) => s.toLowerCase())
              .join("-");
            boxDiv.setAttribute(`data-${attributeName}`, box.number);
          }
        });

        boxDiv.classList.add("box");
        console.log(boxDiv);

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
