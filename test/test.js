const request = require('superagent'),
    assert = require('assert'),
    port = process.env.PORT || 3000,
    baseUrl = process.env.BASE_URL || 'http://localhost:' + port;

let username = 'user_' + new Date().getTime();
let password = 'testp';
let email = 'email_' + new Date().getTime() + '@gmail.com';
let firstName = 'first_' + new Date().getTime();
let lastName = 'last_' + new Date().getTime();
let id = "";
describe('Login App Tests (success cases)', function () {
    const agent = request.agent();
    it('should signup a new user', function (done) {
        agent
            .post(baseUrl + '/signup')
            .send({
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName
            })
            .set('accept', 'json')
            .end((err, res) => {
                id = res.body._id;
                assert.equal(res.status, 200);
                done();
            });
    });

    it('should login the user', function (done) {
        agent
            .post(baseUrl + '/signin')
            .send({
                username: username,
                password: password
            })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('should return the user', function (done) {
        agent
            .get(baseUrl + '/user')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('should update the user', function (done) {
        agent
            .put(baseUrl + '/user/' + id)
            .send({
                firstName: "Ipseeta"
            })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });
});

describe('Login App Tests (error cases)', function () {
    const agent = request.agent();
    it('should give 403 with duplicate username', function (done) {

        agent
            .post(baseUrl + '/signup')
            .send({
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName
            })
            .set('accept', 'json')
            .end((err, res) => {
                id = res.body._id;
                assert.equal(res.status, 403);
                done();
            });
    });

    it('should be redirected to /signin?invalid_credentials=true', function (done) {
        agent
            .post(baseUrl + '/signin')
            .send({
                username: username,
                password: 'password'
            })
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                assert.equal(res.req.path, '/signin?invalid_credentials=true');
                done();
            });
    });
});