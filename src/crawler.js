const jsdom = require("jsdom");
const { fetchProductsHTML } = require('./crawlerRequest');

const { JSDOM } = jsdom;


/**
 * Função que normaliza uma string de acordo com o padrão passado. 
 * Ela deve retornar um array com o formato ()
 *
 * @param {HTMLElement} element
 * @returns {[string, any][]}
 */
function normalize(element) {
    const [link] = element.querySelectorAll('.item__info-title');
    const [price] = element.querySelectorAll('.price__container .item__price');
    const [store] = element.querySelectorAll('.item__brand-title-tos');
    const [state] = element.querySelectorAll('.stack_column_item.status');
    if (!link) {
        return [];
    }
    const item = [
        ['link', link.getAttribute('href') || ''],
        ['name', link.textContent.trim()],
        ['price', price && (Number(price.textContent.trim().replace(/\D/ig, ''))/100)],
        ['store', (store && store.textContent.trim()) || null],
        ['state', (state && state.textContent.trim()) || null],
        ['node', element]
    ];
    return item;
}

/**
 * Função que transforma o mapeamento da função normalize para um objeto json
 * válido
 *
 * @param {[string, any][][]} item
 * @returns {{name:string, link: string, price: number, store: string, state: String}}
 */
function toObject(item) {
    return item
        .reduce(
            (itemObject, [key, value]) => ({ ...itemObject, [key]: value }),
            {}
        );
}

/**
 * Função que recebe o texto enviaado pelo usuário e busca os dados no Mercado Livre
 *
 * @param {String} text
 * @returns {Promise<Array<{name:string, link: string, price: number, store: string, state: String }>>}
 */
async function search(text, limit) {
    if (!text.trim()) {
        return []
    }

    const response = await fetchProductsHTML(text);// await fetch(`https://lista.mercadolivre.com.br/${text}#D[A:${text}]`).then(r => r.text());
    const dom = new JSDOM(response);
    return Array
        .from(dom.window.document.querySelectorAll('#searchResults li'))
        .map(normalize)
        .filter(item => !!item.length)
        .map(toObject).slice(0, limit || Infinity);
}

module.exports = exports = {
    search,
    normalize,
    toObject
}