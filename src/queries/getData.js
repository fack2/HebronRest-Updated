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

const getLoginData = (email, cb) => {
	console.log("database", email);

	dbConnection.query(
		`select password from users where email = $1`,
		[email],
		(err, res) => {
			if (err) {
				console.log('im heere')
				return cb(err);
			}
			console.log('from getLoginData', res.rows[0]);

			cb(null, res.rows[0]);
		}
	);
};

module.exports = { getData, getLoginData};

