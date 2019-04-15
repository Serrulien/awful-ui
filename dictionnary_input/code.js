const textarea = document.getElementsByTagName('textarea')[0];
const dictionnary = document.getElementById('dictionnary');
const index = document.getElementById('index');
const dictWords = document.getElementById('words');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

textarea.addEventListener('keydown', (ev) => {
    ev.preventDefault();
});

(function create_index()
{
	for(const letter of alphabet)
	{
		const elem = document.createElement('button');
		elem.innerText = letter;
		index.appendChild(elem);

		elem.addEventListener('click', ev => populate_word_list(ev.target.innerText));
	}
})();

// i catch the click event that bubbles from the button. Easier than add an eventListener on each button
dictWords.addEventListener('click', function(ev){
	const tagName = ev.target.tagName.toLowerCase();
	if(tagName === 'button' || tagName === '<button>') // the click event can happen when the user clicks inside, resulting in words.length click events (ouch...)
	{
		textarea.value += (ev.target.textContent || ev.target.innerText) + " ";
		textarea.scrollTop = textarea.scrollHeight; // scroll down when adding a word
	}
}, false);

/**
 * Populate the list with words begining with the given letter `firstLetter`
 * @param {string} firstLetter - first letter
 */
function populate_word_list(firstLetter)
{
	while (dictWords.firstChild) {
		dictWords.removeChild(dictWords.firstChild);
	}

	const fragment = document.createDocumentFragment();

	if(!wordsIndex.hasOwnProperty(firstLetter))
	{
		console.error('the given letter {' + firstLetter + '} doesn\'t start any words of the corpus.');
		return;
	}

	const startIndex = wordsIndex[firstLetter][0];
	const length = wordsIndex[firstLetter][1];

	// take 500 words from the corpus
	let nbWords = 0;
	while(nbWords < 500){
		const aleaIndex = Math.floor(Math.random() * length) + startIndex;
		const test = document.createElement('button');
		test.innerText = words[aleaIndex];
		fragment.appendChild(test);
		++nbWords;
	}

	dictWords.appendChild(fragment);
}

populate_word_list('a');
