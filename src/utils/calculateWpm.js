function calculateWpm(text,timeInSeconds) {
    const totalCharacters = text.length 
    const wordsTyped = totalCharacters / 5 
    const wpm = ( wordsTyped / timeInSeconds ) * 60

    return wpm
}

export default calculateWpm