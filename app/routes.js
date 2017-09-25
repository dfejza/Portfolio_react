var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require("xoauth2");

// routes ======================================================================  
// application -------------------------------------------------------------
// expose the routes to our app with module.exports
module.exports = function(app) {
	// login -------------------------------------------------------------
	app.post('/login', function(req,res) {
		var postData = {
			login : req.body.login,
			pass : req.body.pass,
		}
		console.log(postData);
		if(postData.login == "admin1" && postData.pass == "admin1")
		{
			// Connect to the db
			var core = req.db.collection('userinfo');
			core.find().toArray(function(err, items) {
				res.json(items);
			});

		}
		else
		{
			res.send("NO");
		}
		
	});

	// send data -------------------------------------------------------------
	app.post('/sendtodb', function(req, res) {
		console.log("receiving");
		var postData = {
			date : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
			ip : req.body.ip,
			name : req.body.name,
			email : req.body.email,
			message : req.body.message
		}
		console.log(postData);

		// Setup mailer
		var transport = nodemailer.createTransport(smtpTransport({
		  service: process.env.NODEMAILER_SERVICE,
		    auth:{
		        xoauth2: xoauth2.createXOAuth2Generator({
			      user: process.env.NODEMAILER_USER, // Your gmail address.
			      clientId: process.env.NODEMAILER_CLIENTID,
			      clientSecret: process.env.NODEMAILER_CLIENTSECRET,
			      refreshToken: process.env.NODEMAILER_REFRESHTOKEN
			  })
		    }
		}));

	    // Contents of message
	    var mailOptions = {
		    from: process.env.NODEMAILER_USER, // sender address
		    to: "dardan.fejza@gmail.com", // list of receivers
		    subject: postData.date + " " + postData.name, // Subject line
		    generateTextFromHTML: true,
		    text: JSON.stringify(postData) //, // plaintext body
		    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};

		// Send the mail
		transport.sendMail(mailOptions, function(error, response) {
		  if (error) {
		    console.log(error);
		  } else {
		    console.log(response);
		  }
		  transport.close();
		});

		// Connect to the db
		var core = req.db.collection('userinfo');
		core.insert(postData, function(err,results){
			if(err) throw err;
		});
		res.json(postData);
	});

	// update chat -------------------------------------------------------------
	app.get('/updatechat', function(req, res) {
		// Connect to the db
		var core = req.db.collection('chat');
		core.find().toArray(function(err, items) {
			res.json(items); 
		});
	});

	// update chat -------------------------------------------------------------
	app.post('/insertchat', function(req, res) {
		var postData = {
			time : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
			id : req.body.id,
			msg : req.body.msg,
		}
		console.log(postData)
		// Connect to the db
		var core = req.db.collection('chat');
		core.insert(postData, function(err,results){
			if(err) throw err;
		})
	});

	// clear chat -------------------------------------------------------------
	app.post('/clearchat', function(req, res) {
		// Connect to the db
		req.db.collection('chat').remove();
	});

	// MANGA DB ---------------------------------------------------------------
	app.get('/api/updateMangaList', function (req, res, next) {
		mangaDB = [];
		var core = req.db.collection('manga');
		//////////////////
		fs.readdir("./public/assets/manga", (err, files) => {
			files.forEach(function(data,indexk){
				mangaModule = {
					name : data,
					path : "./assets/manga/"+data,
					coverPage : "",
					volumes : "0",
					index : indexk
				};
				mangaDB.push(mangaModule)
			});
			/////////////////////////////
			mangaDB.forEach(function(manga, index) {
				fs.readdir("./public/assets/manga/" + manga.name, (err, mangaPath) => {
					manga.volumes = mangaPath.length-1;
					manga.coverPage = manga.path + "/" + manga.name + ".jpg";
					core.update(manga, manga, {upsert:true})
				});	
			});
		});
		res.send("updated")
	});

	app.get('/api/getMangaList', function (req, res, next) {
		var core = req.db.collection('manga');
		core.find().toArray(function(err, items) {
			res.json(items); 
		});
	});

	// application -------------------------------------------------------------
	app.use(function(req, res) {
		res.sendfile('./build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};