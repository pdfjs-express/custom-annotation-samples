const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const samplesBase = path.resolve(__dirname, './samples');
const samples = fs.readdirSync(samplesBase);
const htmlTemplate = fs.readFileSync(path.resolve(__dirname, './templates/sample.html')) + '';

app.use('/samples', express.static('samples'))
app.use('/static', express.static('static'))

samples.forEach(sampleName => {
  app.get(`/${sampleName}`, (_, res) => {
    const html = htmlTemplate.replace('{{SCRIPT_SRC}}', '/' + path.relative(__dirname, `./samples/${sampleName}/index.js`));
    res.send(html);
  })
})

app.listen(3000, () => {
  console.log('🚀 App listening on port 3000')
})