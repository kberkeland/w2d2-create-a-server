const express = require('express');
const app = express();
const PORT = 5555;

app.use(express.static('server/public'));

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
});