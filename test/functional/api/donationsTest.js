const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

let datastore = require("../../../models/donations");

describe("Donations", () => {
    describe("GET /donations", () => {
        it("should return all the donations", done => {
            request(server)
                .get("/donations")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(2);
                    const result = _.map(res.body, donation => {
                        return { id: donation.id, amount: donation.amount };
                    });
                    expect(result).to.deep.include({ id: 1000000, amount: 1600 });
                    expect(result).to.deep.include({ id: 1000001, amount: 1100 });
                    done(err);
                });
        });
    });
});