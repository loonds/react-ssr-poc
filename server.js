require = require('esm')(module);
require('@babel/register')({
    presets: ['@babel/preset-react']
});

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App').default;

const app = express();

app.get('/', (req, res) => {
    const stream = ReactDOMServer.renderToNodeStream(React.createElement(App));
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head><title>My SSR App</title></head>');
    res.write('<meta name="description" content="Echo">')
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
