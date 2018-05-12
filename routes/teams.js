var express = require('express'),
	mongoose = require('mongoose'),
	Team = mongoose.model('Team'),
	router = express.Router();

router.get('/teams', (req, res, next) => {
	Team
	.find()
	.sort('name')
	.exec((err, results) => {
		if(err)
			return next(err);
		else
			res.json(results);
	});
});

router.get('/teams/:teamId', (req, res, next) => {
	Team
	.findOne({_id:req.params.teamId})
	.exec((err, results)=> {
		if(err)
			return next(err)
		res.json(results);
	});
});

module.exports = router;