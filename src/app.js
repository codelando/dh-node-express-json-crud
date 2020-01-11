const express = require('express');
const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.static('public'));

// Routes
app.use('/', require('./routes/static'));

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));