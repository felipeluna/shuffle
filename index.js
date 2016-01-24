var cheerio = require("cheerio");
var request = require("request");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shuffle');
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


var target = "http://www.serebii.net/shuffle/pokemon.shtml"

db.once('open', function() {

// var zekrom = new Pokemon(
// { number: '#421',
//   img: 'http://www.serebii.net/shuffle/pokemon/421.png',
//   name: 'Zekrom',
//   type: 'electric',
//   basePower: '80',
//   ability: 'Block Smash+',
//   location: 'Special Stages - Stage SP',
//   captureRate: '1%'
// });
//
// zekrom.save();

// Pokemon.find({number : '#421'}, function(err, data){
//     if(err){
//         var latios = { number: '#316',
//   img: 'http://www.serebii.net/shuffle/pokemon/316.png',
//   name: 'Latios',
//   type: 'dragon',
//   basePower: '80',
//   ability: 'Counterattack',
//   location: 'Special Stages - Stage SP',
//   captureRate: '1-100%' }
//   latios.save();
//     }else{
//         { number: '#316',
//   img: 'http://www.serebii.net/shuffle/pokemon/316-m.png',
//   name: 'Latios',
//   type: 'dragon',
//   basePower: '80',
//   ability: 'Counterattack',
//   location: 'Special Stages - Stage SP',
//   captureRate: '1-100%' }
//     }
// });
    request(target, function(err, res, body){
        if (!err && res.statusCode === 200) {
            $ = cheerio.load(body);
            // console.log($);
            var table = $('.dextable');
            $(table).find('tr').each(function(index, row){
                // console.log($(row).text());
                var img = '';
                var n = $(row).find('td:first-child').text();
                var i = $(row).find('td:nth-child(2)').find('table>tbody>tr:first-child>td:first-child>a').attr('src');
                var na = $(row).find('td:nth-child(3)').text();
                var t = $(row).find('td:nth-child(4)').find('img').attr('alt');
                var bp = $(row).find('td:nth-child(5)').text();
                var a = $(row).find('td:nth-child(6)').text();
                var l = $(row).find('td:nth-child(7)').text();
                var cr = $(row).find('td:nth-child(8)').text();


                var pokemon = {
                    number : n,
                    img : i,
                    name : na,
                    type : t,
                    basePower : bp,
                    ability : a,
                    location : l,
                    captureRate : cr
                }
                if(pokemon.number){
                    console.log(i);
                }
            });
        }
    });

});
