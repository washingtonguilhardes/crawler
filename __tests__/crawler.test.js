jest.mock('./../__mocks__/crawlerRequest.js');
jest.mock('node-fetch');

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');

const { search, normalize, toObject } = require('../src/crawler');
const { fetchProductsHTML } = require('./../src/crawlerRequest');
const { JSDOM } = require('jsdom');
// The assertion for a promise must be returned.
describe('[Crawler]', ()=>{
    const template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
    it('[Testando a função que busca os dados]', async ()=>{
        fetch.mockReturnValue(Promise.resolve(new Response(template)));
         const result = await fetchProductsHTML('cadeado');
         expect(result).toBe(template);
    })
    it('[Testando a função que extrai os dados]', ()=>{
        const itemTemplate =  fs.readFileSync(path.join(__dirname, 'itemTemplate.html')).toString();
        const dom = new JSDOM(`<html><body><div id="mock-item">${itemTemplate}</div></body></html>`);
        const item = dom.window.document.getElementById('mock-item');
        const result = normalize(item);
        expect(result).toHaveLength(6);
    })

    it('[Testando a função que faz parser para objeto]', ()=>{

        const result = toObject([
            ['link', 'http://link.com.br'],
            ['name', 'nome produto'],
            ['price', 10],
            ['store', 'loja'],
            ['state', 'estado'],
        ]);

        expect(result.link).toBe('http://link.com.br');
        expect(result.name).toBe('nome produto');
        expect(result.price).toBe(10);
        expect(result.store).toBe('loja');
        expect(result.state).toBe('estado');

    })
    
    it('[Testando a busca sem limites]', async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(template)));
        
            const result = await search('cadeado');
            expect(result).toHaveLength(52);
        });
    it('[Testando a busca com limite de 10 items]', async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(template)));
        
            const result = await search('cadeado', 10);
            expect(result).toHaveLength(10);
        });
});