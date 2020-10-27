require('dotenv').config();

const app = require('./src/App');

app.listen(3000, () => {
    console.log('Listening on port 3000');
})