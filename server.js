var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/shuffle');

var app = express();
// pra que isso
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.json({ message: 'dentro do /' });
});

// models

var Pokemon = require('./models/pokemon');

// Rotas da api
var router = express.Router();

router.use(function(req, res, next){
    console.log('dnetro da router.use');
    next();
});

router.get('/',function(req, res){
    res.json({message: 'dentro do /api'});
});

//routes for /Pokemon

router.route('/pokemons')

    .get(function (req,res) {
        Pokemon.find(function(err, pkmns){
            if(err){
                res.send(err);
            }else{
                res.json(pkmns);
            }
        });
    });

app.use('/api',router);

app.listen('3000',function(){
    console.log('rodando na porta 3000');
})
