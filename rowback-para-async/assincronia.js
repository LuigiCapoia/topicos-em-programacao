const fsp = require('fs').promises;
const fr = require('node-fetch');

async function eArquivo(nome, d) {
    try {
        console.log(`Escrevendo no ${nome}...`);
        await fsp.writeFile(nome, d);
        console.log(`Escrito com sucesso no ${nome}.`);
    } catch (e) {
        console.error(`Erro ao escrever no ${nome}:`, e);
        throw e;
    }
}

async function lArquivo(nome) {
    try {
        console.log(`Lendo do arquivo: ${nome}`);
        const data = await fsp.readFile(nome, 'utf-8');
        console.log(`Dados lidos do arquivo ${nome}`);
        return data;
    } catch (e) {
        console.error(`Erro ao ler dados do arquivo ${nome}`, e);
        throw e;
    }
}

async function obterPokemon() {
    try {
        console.log("Aguardando Poke API");
        const resposta = await fr("https://pokeapi.co/api/v2/pokemon/1");
        const dados = await resposta.json();

        const infoPokemon = {
            nome: dados.name,
            tipos: dados.types.map(tipo => tipo.type.name),
            peso: dados.weight,
            altura: dados.height
        };

        const dadosPokemon = JSON.stringify(infoPokemon, null, 2);
        await eArquivo('pokemon.json', dadosPokemon);

        console.log("Pokemon cadastrado");

        const dadosLocal = await lArquivo('dados.txt');
        console.log(`Conteúdo do dados.txt:`, dadosLocal);

        const dadosSalvos = await lArquivo('pokemon.json');
        console.log("Conteúdo do pokemon.json:", dadosSalvos);
    } catch (e) {
        console.error("Erro ao obter dados do pokemon", e);
    }
}

obterPokemon();
