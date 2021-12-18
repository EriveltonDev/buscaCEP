import buscaCEP from "./buscaFetch.js";

const busca = new buscaCEP ('button', '#buscador', '#logradouro', '#complemento', '#bairro', '#localidade', '#uf');

busca.init();