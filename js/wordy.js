export default {
	loadWords,
	findWords,
};

// ****************************

var dict = {};
var isWord = Symbol("is-word");

// Função para carregar palavras
function loadWords(wordList) {
	var nodeCount = 0;

	// resetar um dicionário previamente carregado?
	if (Object.keys(dict).length > 0) {
		dict = {};
	}

	// construir o dicionário como uma trie
	for (let word of wordList) {
		// percorrer a trie (a partir da raiz), criando nós
		// conforme necessário
		let node = dict;
		for (let letter of word) {
			// se o nó atual não tiver a letra, crie um novo nó
			if (!node[letter]) {
				node[letter] = {
					[isWord]: false,
				};
				nodeCount++;
			}
			// mover para o próximo nó
			node = node[letter];
		}

		// marcar o nó terminal para esta palavra
		node[isWord] = true;
	}

	// retornar o número total de nós criados
	return nodeCount;
}

// Função para encontrar palavras
function findWords(input, prefix = "", node = dict) {
	var words = [];

	// o nó atual é o final de uma palavra válida?
	if (node[isWord]) {
		words.push(prefix);
	}

	// percorrer cada letra na entrada
	for (let i = 0; i < input.length; i++) {
		let currentLetter = input[i];

		// o (sub)trie atual tem um nó para esta letra?
		if (node[currentLetter]) {
			let remainingLetters = [
				...input.slice(0, i),
				...input.slice(i + 1),
			];
			// adicionar todas as palavras encontradas à lista de palavras
			words.push(
				...findWords(
					remainingLetters,
					prefix + currentLetter,
					node[currentLetter]
				)
			);
		}
	}

	// retornar a lista de palavras encontradas
	return words;
}
