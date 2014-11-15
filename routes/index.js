var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var date = require('../public/javascripts/date.js')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/adventure', function(req, res) {
    var url = 'http://en.wikipedia.org/wiki/List_of_Adventure_Time_episodes';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.vevent > td:nth-child(6)').filter(function(){
                var rough = $(this).text(),
                    data;
                data = (rough.indexOf('[') == -1)? rough.split(/\W+/).slice(0, 3).join(' ') : rough.split('[')[0].split(' ').slice(0, 3).join(' ');
                data = Date.parse(data);
                if (data == null) {

                } else if (Date.today().compareTo(data) == -1) {
                    var diff = Math.abs(Date.today().getDayOfYear() - data.getDayOfYear())
                    data = data.toString().split(/\W+/).slice(0,4).join(' ');
                    res.end(JSON.stringify({date:data, days:diff}));
                }
            });
        }
    });
});


module.exports = router;