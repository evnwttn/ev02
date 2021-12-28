let container = document.getElementById("container");

class ev02 {
  constructor(rows) {
    this.parentDiv = document.createElement("div");

    rows.forEach((row, index) => {
      const rowDiv = document.createElement("div");

      row.forEach((key) => {
        const keyDiv = document.createElement("div");
        keyDiv.setAttribute("data-number", key.number);
        keyDiv.setAttribute("data-working-title", key.workingTitle);
        keyDiv.setAttribute("data-demo", key.demo);
        keyDiv.setAttribute("data-guitar", key.guitar);
        keyDiv.setAttribute("data-bass", key.bass);
        keyDiv.setAttribute("data-drums", key.drums);
        keyDiv.setAttribute("data-synths", key.synths);
        keyDiv.setAttribute("data-fx", key.fx);
        keyDiv.setAttribute("data-mix", key.mix);
        keyDiv.setAttribute("data-master", key.master);
        keyDiv.setAttribute("data-done", key.done);

        key.classes.split(" ").forEach((klass) => {
          keyDiv.classList.add(klass);
        });

        keyDiv.setAttribute("data-key", key.keyCode);

        // const keySpan = document.createElement("span");

        // if (typeof key.value === "string") {
        //   keySpan.innerHTML = key.value;
        // } else if (Array.isArray(key.value)) {
        //   key.value.forEach((value) => {
        //     const valueDiv = document.createElement("div");
        //     valueDiv.innerHTML = value;
        //     keySpan.appendChild(valueDiv);
        //   });
        // } else {
        //   throw new Error(`unknown key.value!: ${key.value}`);
        // }

        keyDiv.appendChild(keySpan);
        rowDiv.appendChild(keyDiv);
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
