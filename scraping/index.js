var cheerio = require("cheerio");
var request = require("request");
var mongoose = require('mongoose');

mongoose.connect("mongodb://ash:asdqweert123'@ds049935.mongolab.com:49935/shuffle");
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

var pokemonSchema = mongoose.Schema({
    number : String,
    img : String,
    name : String,
    type : String,
    basePower : String,
    ability : String,
    location : String,
    captureRate : String
});

var Pokemon = mongoose.model('Pokemon',pokemonSchema);

db.once('open', function() {

    var target = "http://www.serebii.net/shuffle/pokemon.shtml"


    request(target, function(err, res, body){
        if (!err && res.statusCode === 200) {
            $ = cheerio.load(body);
            // console.log($);
            var table = $('.dextable');
            $(table).find('tr').each(function(index, row){
                // console.log($(row).text());
                var p = {};
                p.number = $(row).find('td:first-child').text();

                $(row).find('td:nth-child(2)').find('table').find('tr').each(function(i,r){
                    p.img = "http://www.serebii.net/" + $(r).find('td:first-child').find('a>img').attr('src');
                });
                p.name = $(row).find('td:nth-child(3)').text();
                p.type = $(row).find('td:nth-child(4)').find('img').attr('alt');
                p.basePower = $(row).find('td:nth-child(5)').text();
                p.ability = $(row).find('td:nth-child(6)').text();
                p.location = $(row).find('td:nth-child(7)').text();
                p.captureRate = $(row).find('td:nth-child(8)').text();



                if(p.number){
                    console.log(p);
                    var pkmn = new Pokemon(p);
                    pkmn.save();
                }
            });
        }
    });
    // mongoose.disconnect();

});
