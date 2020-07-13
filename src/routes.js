const { Router } = require('express');
const crawler = require('./crawler');

const routes = Router();


routes.post('/search', async (req, res)=>{
    const { search, limit } = req.body;
    const result = await crawler.search(search || '');
    res.status(200).send(result.slice(0, limit || 10));
});

module.exports = exports = routes;