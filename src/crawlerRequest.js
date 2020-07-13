const fetch = require('node-fetch');

/**
 * Função que recebe o texto enviaado pelo usuário e busca os dados no Mercado Livre
 *
 * @param {String} text
 * @returns {Promise<string>}
 */
async function fetchProductsHTML(text){
    if(!text.trim()){
        return ''
    }

    return await fetch(`https://lista.mercadolivre.com.br/${text}#D[A:${text}]`).then(r =>  r.text());
}

module.exports = exports = {
    fetchProductsHTML
}