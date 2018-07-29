function syllable_count(text) {
    let words = text.split(/,| /);
    let numOfSyllables = 0;
    for(const word of words) {
        let currWord = word.toLowerCase();
        if(currWord.length <= 3) {
            numOfSyllables += 1;
            continue;
        }
        currWord = currWord.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        currWord = currWord.replace(/^y/, '');
        numOfSyllables += currWord.match(/[aeiouy]{1,2}/g).length;
    }

    return numOfSyllables;
}

function score(text) {
    let totalWords = text.split(' ').length;
    let totalSentences = 1;
    if(text.split('.').length > 1) {
        let sentences = text.split(/[\\.!?]/);
        let nonEmptySentences = 0;
        for(let s of sentences){
            s = s.trim();
            if(s.length > 0) {
                nonEmptySentences += 1;
            }
        }
        totalSentences = nonEmptySentences;
    }
    let totalSyllables = syllable_count(text);
    console.log('totalWords: ' + totalWords);
    console.log('totalSentences: ' + totalSentences);
    console.log('totalSyllables: ' + totalSyllables);
    return 206.835 - 1.015*(totalWords/totalSentences) - 84.6*(totalSyllables/totalWords)
}

$(function() {
    let text;

    console.log( "ready!" );
    $(document).on('keyup', '#str', function() {
        text = $('#str').val();
        console.log(text);
        if(text.length > 0) {
            $('#score').html('Score: ' + score(text));
        }
    });
});