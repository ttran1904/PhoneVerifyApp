require('dotenv').config();

const app = require('./AppBackend');

app.listen(3000, () => {
    console.log('Listening on port 3000');
})