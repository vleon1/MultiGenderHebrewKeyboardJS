let Keyboard = window.SimpleKeyboard.default;

let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  theme: "hg-theme-default hg-layout-default myTheme",
  newLineOnEnter: true, 
  layout: {
    default: [
      "{switch}",
      "; 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} / ' \u05e7 \u05e8 \u05d0 \u05d8 \u05d5 \u05df \u05dd \u05e4 ] [ \\",
      "{lock} \u05e9 \u05d3 \u05d2 \u05db \u05e2 \u05d9 \u05d7 \u05dc \u05da \u05e3 , {enter}",
      "{shift} \u05d6 \u05e1 \u05d1 \u05d4 \u05e0 \u05de \u05e6 \u05ea \u05e5 . {shift}",
      "{space}"
    ],
    shift_default: [
      "{switch}",
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} / ' \u05ce \u05e4 \u05ed \u05cd \u05ca \u05cb \u05cb \u05e4 { } |",
      "{lock} \u05e9 \u05d3 \u05d2 \u05e4 \u05cf \u05ca \u05ec \u05dc \u05da : \" {enter}",
      "{shift} \u05ee \u05eb \u05cf \u05cc \u05e0 \u05de \u05e6 < > ? {shift}",
      "{space}"
    ],
    added_row: [
      "{switch}",
      "; 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "\u05ee \u05ed \u05ec \u05eb \u05cf \u05ce \u05cd \u05cc \u05cb \u05ca \u05c9",
      "{tab} / ' \u05e7 \u05e8 \u05d0 \u05d8 \u05d5 \u05df \u05dd \u05e4 ] [ \\",
      "{lock} \u05e9 \u05d3 \u05d2 \u05db \u05e2 \u05d9 \u05d7 \u05dc \u05da \u05e3 , {enter}",
      "{shift} \u05d6 \u05e1 \u05d1 \u05d4 \u05e0 \u05de \u05e6 \u05ea \u05e5 . {shift}",
      "{space}"
    ],
    shift_added_row: [
      "{switch}",
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "\u05ee \u05ed \u05ec \u05eb \u05cf \u05ce \u05cd \u05cc \u05cb \u05ca \u05c9",
      "{tab} Q W E R T Y U I O P { } |",
      "{lock} A S D F G H J K L : \" {enter}",
      "{shift} Z X C V B N M < > ? {shift}",
      "{space}"
    ]
  },
  mergeDisplay: true,
  display: {
    '{switch}': 'Change keyboard type'
  }
});

/**
 * Update simple-keyboard when input is changed directly
 */
document.querySelector(".input").addEventListener("input", event => {
  keyboard.setInput(event.target.value);
});

function onChange(input) {
  document.querySelector(".input").value = input;
}

function onKeyPress(button) {
  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
  if (button === "{switch}") handleSwitch();
  
  setTimeout(function() {
    document.querySelector(".input").focus();
  }, 0);
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout.includes("shift_") ? currentLayout.replace('shift_', '') : 'shift_' + currentLayout;

  keyboard.setOptions({
    layoutName: shiftToggle
  });
}

function handleSwitch() {
  let currentLayout = keyboard.options.layoutName;
  let switchToggle = currentLayout.includes("default") ? currentLayout.replace('default', 'added_row') : currentLayout.replace('added_row', 'default');

  keyboard.setOptions({
    layoutName: switchToggle
  });
}
