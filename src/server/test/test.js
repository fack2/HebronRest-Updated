const test = require("tape");
const router = require("../router");
const supertest = require("supertest");

test("Testing tape", t => {
	t.equal(1, 1, "one equals one");
	t.end();
});

test("Testing home endpoint", t => {
	supertest(router)
		.get("/")
		.expect(200)
		.expect("Content-Type", /html/)
		.end((error, result) => {
			t.error(error);
			t.end();
		});
});
