var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res, next) {
	Page.findAll()
		.then(function(foundPages){
			res.render('index', {
				pages: foundPages
			})
		})

	// res.render('index', {});
	// res.redirect('/');
	// res.send('got to GET /wiki/');
	// next()
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
	where: {
	  	name: req.body.authorName,
	  	email: req.body.authorEmail
	}
  })
  .then(function(values){
  	var user = values[0];
  	console.log("tags here ", req.body.tags)
  	
  	var tagsArr = req.body.tags.split(" ")

  	var page = Page.build({
	  	title: req.body.title,
	  	content: req.body.pageContent,
	  	status: req.body.status,
	  	tags: tagsArr
	});


	return page.save().then(function(page){
		return page.setAuthor(user)
	})

  })
  .then(function(page){
  		res.redirect(page.route);
  	}).catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
  	var tagStr = foundPage.tags.join(", ")
  	var findingAuthor = foundPage.getAuthor()
  	findingAuthor.then(function(author){
  		res.render('wikipage', {
    		page: foundPage,
    		author: author,
    		tags: tagStr
    	});
  	});
  })
  .catch(next);
});


module.exports = router;