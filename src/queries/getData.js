const dbConnection = require('../database/db_connection');

const getData = (type, cb) => {
  dbConnection.query(
    `select res_name,phone,delivery from restaurant where cuisine = $1`,
    [type],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      cb(null, res.rows);
    }
  );
};

const getLoginData = (email, cb) => {

dbConnection.query(`select exists (select email from users where email = $1)`,[email],(err,result)=>{

		if(err){
			return cb(err)
		}
		else if(result.rows[0].exists){
		dbConnection.query(
			`select password from users where email = $1`,
			[email],
			(error, res) => {
			  if (error) {
		
			
			  }
		
			  cb(null, res.rows[0]);
			}
		  );
	} //else if
	else if(!result.rows[0].exists){
		return cb("false error",err);
	}


	}
)

}

module.exports = { getData, getLoginData };
