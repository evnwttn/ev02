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

        const keySpan = document.createElement("span");

        if (key.multiClasses !== undefined) {
          const multiDiv = document.createElement("div");
          const multiText = key.sound || key.octave || key.multi;
          keyDiv.appendChild(multiDiv);
          key.multiClasses.forEach((klass) => {
            multiDiv.classList.add(klass);
          });
          multiDiv.innerHTML = `${multiText}`;
        }

        if (typeof key.value === "string") {
          keySpan.innerHTML = key.value;
        } else if (Array.isArray(key.value)) {
          key.value.forEach((value) => {
            const valueDiv = document.createElement("div");
            valueDiv.innerHTML = value;
            keySpan.appendChild(valueDiv);
          });
        } else {
          throw new Error(`unknown key.value!: ${key.value}`);
        }

        keyDiv.appendChild(keySpan);
        rowDiv.appendChild(keyDiv);
      });

      this.parentDiv.appendChild(rowDiv);
    });

    this.parentDiv.setAttribute("id", `keyboard-${this.keyboardName}`);

    const getKey = (e) => {
      let location = e.location;
      let selector;
      if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = [
          '[data-right="true"]',
          '[data-key="' + e.keyCode + '"]',
        ].join("");
      } else {
        let code = e.keyCode || e.which;
        selector = [
          '[data-key="' + code + '"]',
          '[data-char*="' +
            encodeURIComponent(String.fromCharCode(code)) +
            '"]',
        ].join(",");
      }
      return this.parentDiv.querySelector(selector);
    };

    this.parentDiv.addEventListener("keydown", (e) => {
      e.preventDefault();
      let key = getKey(e);
      if (!key) {
        return console.warn("No key for", e);
      }
      key.setAttribute("data-pressed", "on");
      this.handleKey(key);
    });

    this.parentDiv.addEventListener("keyup", (e) => {
      e.preventDefault();
      let key = getKey(e);
      key && key.removeAttribute("data-pressed");
    });

    this.parentDiv.addEventListener("click", (e) => {
      let key = e.target;
      if (key.hasAttribute("data-key") === true) {
        this.handleKey(key);
      }
    });

    this.octave = 4;
    this.volume = 0;
    this.oscNum = 0;
    this.oscType = ["sawtooth", "triangle", "square", "sine"];
    this.synth = this.makeSynth(this.oscType[this.oscNum]);
  }

  handleKey(key) {
    this.setSynth(key);
    this.setOctave(key);
    this.setVolume(key);
    this.handleSound(key);
  }

  makeSynth(synthType) {
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: synthType,
      },
      volume: this.volume,
    }).toDestination();
  }

  setSynth(keyElm) {
    if (keyElm.hasAttribute("data-osc-up")) {
      if (this.oscNum <= this.oscType.length - 2) {
        this.oscNum++;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    } else if (keyElm.hasAttribute("data-osc-down")) {
      if (this.oscNum >= 1) {
        this.oscNum--;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    }
    this.uiOsc.innerHTML = `[${this.oscType[this.oscNum]}]`;
  }

  setVolume(keyElm) {
    if (keyElm.hasAttribute("data-vol-up")) {
      if (this.volume <= 29) {
        this.volume++;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    } else if (keyElm.hasAttribute("data-vol-down")) {
      if (this.volume >= -29) {
        this.volume--;
        this.synth = this.makeSynth(this.oscType[this.oscNum]);
      }
    }
    this.uiVol.innerHTML = `[${this.volume}db]`;
  }

  setOctave(keyElm) {
    if (keyElm.hasAttribute("data-octave-up")) {
      if (this.octave <= 8) {
        this.octave++;
      }
    } else if (keyElm.hasAttribute("data-octave-down")) {
      if (this.octave >= 1) {
        this.octave--;
      }
    } else if (keyElm.hasAttribute("data-octave")) {
      this.octave = keyElm.getAttribute("data-octave");
    }
    this.uiOct.innerHTML = `[0${this.octave}]`;
  }

  handleSound(keyElm) {
    if (keyElm.hasAttribute("data-sound")) {
      let note = keyElm.getAttribute("data-sound");
      this.synth.triggerAttackRelease(`${note}${this.octave}`, "4n");
    }
  }

  getElement() {
    return this.parentDiv;
  }
}

let keyboardNum = 0;
container.prepend(new Keyboard(keyboardNum, defaultRows).getElement());

document.getElementById("add-keyboard").onclick = (event) => {
  keyboardNum++;
  container.prepend(new Keyboard(keyboardNum, defaultRows).getElement());
};
