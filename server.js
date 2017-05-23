var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var builder = require('xmlbuilder');
var fs = require('file-system');
app.use(bodyParser.json());

app.post('/export', function(req, res) {
	var i=0;
	var doc = builder.create('Feed').att('xmlns', 'http://www.bazaarvoice.com/xs/PRR/PostPurchaseFeed/5.6')
	  .ele('Interaction')
	    .ele('TransactionDate').txt('2017-01-07T00:00:00.000')
	    .up()
	  .ele('Locale').txt('en_US').up()
	  .ele('UserName').txt('Test').up()
	  .ele('UserID').txt('12345').up()
	  .ele('Products');
	  for(i=0; i < req.body.length; i++) {
	    doc.ele('Product')
	    .ele('ExternalId').txt(req.body[i].Id).up()
	    .ele('Name').txt(req.body[i].Name).up()
	    .ele('ImageUrl').txt(req.body[i].ImageUrl).up()
	  }
	var xml = doc.end({ pretty: true });
	console.log(xml.toString());
	var file_name = "feed_" + Math.round((new Date()).getTime() / 1000) +".xml";
	var full_directory = "dist/feeds/" + file_name;
	fs.writeFile(full_directory, xml.toString(), function(err) {
	     if(err) {
	         return console.log(err);
	     }
	});
	res.send({'url':'catalogue/feeds/' + file_name});
});

app.set('port', 3000);
app.use(express.static(__dirname + '/dist'));

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port')  ) ;
});