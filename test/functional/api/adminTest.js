const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const Admin = require("../../../models/admin");
const mongoose = require("mongoose");

const _ = require("lodash");
let server;
let mongod;
let db, validID, validNAME;

describe("Admin", () => {

});
