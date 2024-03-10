export default {
	loadWords,
	findWords,
};

// Inicializa um array vazio para o dicionário
var dict = [];

// Função para carregar palavras no dicionário
function loadWords(wordList) {
	// Aqui, nosso dicionário é apenas um array de strings,
	// sem nenhuma estrutura mais complexa
	// A função spread (...) é usada para copiar todos os elementos de wordList para dict
	dict = [...wordList];

	// Retorna o número de palavras carregadas no dicionário
	return dict.length;
}

// Função para encontrar palavras no dicionário
function findWords(input) {
	var words = [];

	// Consulta cada palavra em nosso dicionário
	for (let word of dict) {
		if (
			// Verifica se há caracteres suficientes na entrada para construir a palavra
			input.length >= word.length &&
			// Verifica se alguma permutação da entrada corresponde à palavra
			checkWord(word, input)
		) {
			// Se sim, adiciona a palavra na lista de palavras encontradas
			words.push(word);
		}
	}

	// Retorna a lista de palavras encontradas
	return words;
}

// Função para verificar se uma palavra pode ser formada a partir da entrada
function checkWord(word, input) {
	// Chama a função permute para permutar as letras de entrada
	return permute("", input);

	// Função para permutar as letras de entrada (k! variações)
	function permute(prefix, remaining) {
		for (let i = 0; i < remaining.length; i++) {
			let current = prefix + remaining[i];

			// Verifica se encontrou uma permutação que corresponde à palavra
			if (current == word) {
				return true;
			} else if (
				// Verifica se há letras restantes na entrada para permutar e concatenar
				remaining.length > 1 &&
				// Verifica se a string atual é menor que a palavra alvo
				current.length < word.length
			) {
				// Verifica todas as letras restantes permutadas
				if (
					permute(
						current,
						remaining.slice(0, i) + remaining.slice(i + 1)
					)
				) {
					// Propaga o sinal de correspondência encontrado de volta para cima
					// na cadeia de recursão
					return true;
				}
			}
		}

		// Se nenhuma permutação corresponder, retorna falso
		return false;
	}
}
