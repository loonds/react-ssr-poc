require = require('esm')(module);
require('@babel/register')({
    presets: ['@babel/preset-react']
});

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App').default;

const app = express();

const title = 'My SSR App';
const description = 'Your page description goes here';
const keywords = 'keyword1, keyword2, keyword3';
const author = 'Your Name';

app.get('/', (req, res) => {
    const stream = ReactDOMServer.renderToNodeStream(React.createElement(App));
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write(`<head><title>${title}</title></head>`);
    res.write(`<meta name="description" content="${description}">`);
    res.write(`<meta name="keywords" content="${keywords}">`);
    res.write(`<meta name="author" content="${author}">`);
    res.write('<body>');
    stream.pipe(res, {end: false});
    stream.on('end', () => {
        res.write('</body>');
        res.write('</html>');
        res.end();
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SSR running on port ${PORT}`);
});
