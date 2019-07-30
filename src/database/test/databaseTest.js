const test = require("tape");
const runDbBuild = require("../db_build");
const getData = require("../../queries/getData");

test("testing tape", t => {
    t.equal(1, 1, "one equals one");
    t.end();
});

test("Testing getData", t => {
    let expected = [{
        res_name: "Roza Crunchy"
    }, {
        res_name: "KFC"
    }];

    runDbBuild((error, res) => {
        t.error(error, "No error");

        getData("fastfood", (err, result) => {
            if (err) {
                return err;
            }
            t.deepEqual(result, expected, "It should be an array with two objects");
            t.end();
        });
    });
});