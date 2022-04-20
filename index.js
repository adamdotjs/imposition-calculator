const formEl = document.querySelector('form');
const parentSheet = document.querySelector('#parent-sheet');
let specs = {};

const setParent = () => {
  parentSheet.style.setProperty('--parent-width', specs['parent-w'] + 'vw');
  parentSheet.style.setProperty('--parent-height', specs['parent-h'] + 'vw');
  parentSheet.style.setProperty('--margin-top', specs['margin-t'] + 'vw');
  parentSheet.style.setProperty('--margin-bottom', specs['margin-b'] + 'vw');
  parentSheet.style.setProperty('--margin-left', specs['margin-l'] + 'vw');
  parentSheet.style.setProperty('--margin-right', specs['margin-r'] + 'vw');
  parentSheet.style.setProperty('--gutter', specs['gutter'] + 'vw');
};

// figure out imposition layout and render on screen
const renderFlats = () => {
  parentSheet.innerHTML = '';

  // base size after accounting for margin sizes. Gutters are calculated separately to avoid convoluted calculations.
  const baseAreaX = specs['parent-w'] - (specs['margin-l'] + specs['margin-r']);
  const baseAreaY = specs['parent-h'] - (specs['margin-t'] + specs['margin-b']);

  // allowable space after accounting for gutters. Use these values to calculate the layout.
  const finalAreaX = baseAreaX - specs['gutter'] * (Math.floor(baseAreaX / specs['flat-w']) - 1);
  const finalAreaY = baseAreaY - specs['gutter'] * (Math.floor(baseAreaY / specs['flat-h']) - 1);

  const flatW = specs['flat-w'] + specs['bleeds'] * 2;
  const flatH = specs['flat-h'] + specs['bleeds'] * 2;

  const numX = Math.floor(finalAreaX / flatW);
  const numY = Math.floor(finalAreaY / flatH);

  for (let i = 0; i < numX * numY; i++) {
    const flat = document.createElement('div');
    flat.classList.add('flat-sheet');
    flat.style.setProperty('--flat-width', flatW + 'vw');
    flat.style.setProperty('--flat-height', flatH + 'vw');
    flat.style.setProperty('--bleeds', specs['bleeds'] + 'vw');
    parentSheet.appendChild(flat);
  }
};

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  let data = new FormData(formEl);

  for (let [name, value] of data) {
    specs = { ...specs, [name]: parseFloat(value) };
  }

  setParent();
  renderFlats();
});

document.querySelector('#reset').addEventListener('click', (e) => {
  parentSheet.innerHTML = '';
});
