var express = require('express'),
	mongoose = require('mongoose'),
	Employee = mongoose.model('Employee'),
	Team = mongoose.model('Team'),
	router = express.Router();

router.get('/employees', (req, res, next) => {
	Employee
	.find()
	.sort('name.last')
	.exec((err, results) => {
		if(err)
			return next(err);
		else
			res.json(results);
	});
});

router.get('/employees/:employeeId', (req, res, next) => {
	Employee
	.findOne({_id:req.params.employeeId})
	.populate('team')
	.exec((err, results) => {
		if(err)
			return next(error);
		else{
			if(!results)
				return res.send(404);
			else
				res.json(results);
		}
	});
});

router.put('/employees/:employeeId', (req, res, next) => {
	delete req.body._id;
	req.body.team = req.body.team._id;
	Employee
	.update({id:req.params.employeeId}, req.body, () => {
		if(err)
			return next();
		else
			res.send(200);
	});
});

module.exports = router;