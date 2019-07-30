const dbConnection = require('../database/db_connection');

const getData = (type, cb) => {
	dbConnection.query(`select res_name,phone,delivery from restaurant where cuisine = $1`, [ type ], (err, res) => {
		if (err) {
			return cb(err);
		}
		console.log('from database', res.rows);
		cb(null, res.rows);
	});
};

module.exports = getData;
