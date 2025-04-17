const expect = require("chai").expect;
const request = require("request");

describe("Sum Calculator API", function () {
  const baseUrl = "http://localhost:3000";

  it("should return correct sum for valid numbers", function (done) {
    request.get(`${baseUrl}/add?num1=10&num2=5`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.include("15"); // Response contains the sum in plain text or HTML
      done();
    });
  });

  it("should handle missing parameters", function (done) {
    request.get(`${baseUrl}/add?num1=10`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200); // Expect error
      done();
    });
  });

  it("should return error for non-numeric input", function (done) {
    request.get(`${baseUrl}/add?num1=hello&num2=world`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });
});

describe("Subtract Calculator API", function () {
  const baseUrl = "http://localhost:3000"; // Use the correct port

  it("should return correct result for valid numbers", function (done) {
    request.post({ url: `${baseUrl}/subtract`, json: { num1: 10, num2: 5 },},
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.result).to.equal(5); // Ensure the result is correct
        done();
      }
    );
  });

  it("should handle missing parameters", function (done) {
    request.post({ url: `${baseUrl}/subtract`, json: { num1: 10 },},
      function (error, response, body) {
        expect(response.statusCode).to.equal(400); // Expect error due to missing parameter
        expect(body.error).to.equal("Invalid numbers provided"); // Check error message
        done();
      }
    );
  });

  it("should return error for non-numeric input", function (done) {
    request.post({ url: `${baseUrl}/subtract`, json: { num1: "hello", num2: "world" },},
      function (error, response, body) {
        expect(response.statusCode).to.equal(400); // Expect 400 error
        expect(body.error).to.equal("Invalid numbers provided"); // Ensure the error message is correct
        done();
      }
    );
  });
});