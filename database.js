// database.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ma_base_de_donnees', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
