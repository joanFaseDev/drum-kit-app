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

/* */
function activateClass(keyCode) {
  const div = document.querySelector(`.container-${keyCode}`);
  div.classList.add(`div--active`);
}

/* */
function deactivateClass(evt) {}

/* Initialize Audio object with the sound bind to the key being pressed then return it*/
function createSound(key) {
  const drumSound = `sounds/${key}.wav`;
  const sound = new Audio(drumSound);
  return sound;
}

/* Check if the sound can be entirely played and, if yes, play it */
function playDrum(sound) {
  sound.addEventListener(`canplaythrough`, (evt) => {
    console.log(`No Problem! ${evt}`);
    sound.play();
  });
}

function isPressed(code) {
  console.log(`The key is ${keyPressed[code]}`);
  return keyPressed[code];
}

/* Is triggered when a key is pressed */
document.addEventListener(`keydown`, (evt) => {
  const keyCode = evt.code;
  if (testKey(keyCode)) {
    activateClass(keyCode);
    const sound = createSound(keyCode);
    playDrum(sound);
  } else {
    console.log(`${keyCode} is not bind with any particular sound.`);
  }
});

/* Is triggered when a key is released */
document.addEventListener(`keyup`, (evt) => {
  console.dir(evt);
  if (testKey(evt.code)) {
    const div = document.querySelector(`.container-${evt.code}`);
    console.log(div);
    div.classList.remove(`div--active`);
  }
});
