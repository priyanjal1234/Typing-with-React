function generateRandomWords() {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const numberOfWords = 10;
  let sentence = [];

  for (let i = 0; i < numberOfWords; i++) {
    let wordLength = 5
    let word = "";

    for (let j = 0; j < wordLength; j++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      word += chars[randomIndex];
    }

    sentence.push(word);
  }

  const sentenceString = sentence.join(" ");

  return sentenceString;
}

export default generateRandomWords
