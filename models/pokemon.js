var mongoose = require('mongoose');


var PokemonSchema = mongoose.Schema({
    number : String,
    img : String,
    name : String,
    type : String,
    basePower : String,
    ability : String,
    location : String,
    captureRate : String
});


module.exports = mongoose.model('Pokemon',PokemonSchema);
