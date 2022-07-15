const keyCodes = [
  `KeyA`,
  `KeyS`,
  `KeyD`,
  `KeyF`,
  `KeyG`,
  `KeyH`,
  `KeyJ`,
  `KeyK`,
  `KeyL`,
];

const keyPressed = {
  KeyA: false,
  KeyS: false,
  KeyD: false,
  KeyF: false,
  KeyG: false,
  KeyH: false,
  KeyJ: false,
  KeyK: false,
  KeyL: false,
};

/* Evalutate if the key being pressed has its code in the array */
function testKey(code) {
  return keyCodes.some((element) => element === code);
}

/* Activate / Deactivate the visual feedback when a key is pressed/released */
function toggleClass(keyCode) {
  const div = document.querySelector(`.container-${keyCode}`);
  const body = document.querySelector(`body`);
  div.classList.toggle(`div--active`);
  div.firstElementChild.classList.toggle(`p--active`);
  div.lastElementChild.classList.toggle(`span--active`);
  body.classList.toggle(`body--active`);
}

/* */
function deactivateClass(evt) {
  const div = document.querySelector(`.container-${evt.code}`);
  div.classList.remove(`div--active`);
}

/* Initialize Audio object with the sound bind to the key being pressed then return it*/
function createSound(key) {
  const drumSound = `sounds/${key}.wav`;
  const sound = new Audio(drumSound);
  return sound;
}

/* Check if the sound can be entirely played and, if yes, play it */
function playDrum(sound) {
  sound.addEventListener(`canplaythrough`, (evt) => {
    sound.play();
  });
}

/* Check if the key being pressed have been released (goal here is to prevent a drum sound loop) */
function isPressed(code) {
  return keyPressed[code];
}

/* Switch the present state of a key to its opposite */
function toggleKeyState(code) {
  keyPressed[code] = !keyPressed[code];
}

/* Is triggered when a key is pressed */
document.addEventListener(`keydown`, (evt) => {
  const keyCode = evt.code;
  if (!isPressed(keyCode)) {
    if (testKey(keyCode)) {
      toggleClass(keyCode);
      const sound = createSound(keyCode);
      playDrum(sound);
      toggleKeyState(keyCode);
    } else {
      console.log(`${keyCode} is not bind with any particular sound.`);
    }
  }
});

/* Is triggered when a key is released */
document.addEventListener(`keyup`, (evt) => {
  if (testKey(evt.code) && isPressed(evt.code)) {
    toggleClass(evt.code);
    // const div = document.querySelector(`.container-${evt.code}`);
    // div.classList.remove(`div--active`);
    toggleKeyState(evt.code);
  }
});
