let mongoose = require('mongoose');

// create a model class
let contactSchema = mongoose.Schema({
    name: String,
    price: String,
    description: String
},
{
    collection: "favourite-things"
});

module.exports = mongoose.model('favourite-things', contactSchema);