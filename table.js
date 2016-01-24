var cheerio = require("cheerio");
var cheerioTableparser = require('cheerio-tableparser')
var request = require("request");

var target = "http://www.serebii.net/shuffle/pokemon.shtml"

var pokemon = {};
request(target, function(err, res, body){
    if (!err && res.statusCode === 200) {
        $ = cheerio.load(body);
        // console.log($);
        var table = $('.dextable');
        console.log($(table));

        // $(table).find('tr').each(function(index, row){
        //     // console.log($(row).text());
        //     var number = $(row).find('td:first-child').text();
        //     var img  = $(row).find('td:nth-child(2)>table>tbody>tr>td:first-child>a>img').text();
        //     var name = $(row).find('td:nth-child(3)').data();
        //     var type = $(row).find('td:nth-child(4)').find('img').attr('src');
        //     var basePower = $(row).find('td:nth-child(5)').text();
        //     var ability = $(row).find('td:nth-child(6)').text();
        //     var location = $(row).find('td:nth-child(7)').text();
        //     var captureRate = $(row).find('td:nth-child(8)').text();
        //     console.log(img);
        // });

    }
});
