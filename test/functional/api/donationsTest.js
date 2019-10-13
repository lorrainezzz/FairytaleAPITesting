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

    describe("GET /donations/:id", () => {
        describe("when the id is valid", () => {
            it("should return the matching donation", done => {
                request(server)
                    .get(`/donations/${datastore[0].id}`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.deep.include(datastore[0]);
                        done(err);
                    });
            });
        });
        describe("when the id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .get("/donations/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({ message: "Donation NOT Found!" }, (err, res) => {
                        done(err);
                    });
            });
        });
    });

    describe("POST /donations", () => {
        it("should return confirmation message and update datastore", () => {
            const donation = {
                paymenttype: "Visa",
                amount: 1200,
                upvotes: 0
            };
            return request(server)
                .post("/donations")
                .send(donation)
                .expect(200)
                .expect({ message: "Donation Added!" });
        });
        after(() => {
            return request(server)
                .get("/donations")
                .expect(200)
                .then(res => {
                    expect(res.body.length).equals(3);
                    const result = _.map(res.body, donation => {
                        return {
                            paymenttype: donation.paymenttype,
                            amount: donation.amount
                        };
                    });
                    expect(result).to.deep.include({ paymenttype: "Visa", amount: 1200 });
                });
        });
    });

});