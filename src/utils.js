/**
 * Shuffles an array in place and returns it.
 * Uses the Fisher-Yates algorithm.
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = randomIndex(i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Returns a random integer index between 0 and max inclusive. */
function randomIndex(max) {
  return Math.floor(Math.random() * (max + 1));
}

/** Decodes HTML entities in a string. */
export function decodeString(str) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
}
