const dbConnection = require('../database/db_connection');

const postData = (result, cb) => {
  dbConnection.query(
    `INSERT INTO restaurant (cuisine,res_name,location,phone,delivery) VALUES ($1,$2,$3,$4,$5)`,
    [
      result.cuisine,
      result.res_name,
      result.location,
      result.phone,
      result.delivery,
    ],
    (err, res) => {
      if (err) {
        return cb(err);
      }
      console.log('data from post  data what to insert', res.rows);
      cb(null, res.rows);
    }
  );
};
module.exports = postData;
