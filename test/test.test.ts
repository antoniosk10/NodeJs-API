import { newServer } from "../server";
import supertest from "supertest";
const request = supertest(newServer());

describe("test CRUD scenarios #1", () => {
  let tempID: string;
  test("'GET /api/users' expect []", (done) => {
    request.get("/api/users").then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      done();
    });
  });
  test("'POST /api/users' expect received user", (done) => {
    const expectedObj = { username: "Ivan", age: 23, hobbies: ["football"] };
    request
      .post("/api/users")
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        tempID = res.body.id;
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(expectedObj);
        done();
      });
  });

  test("'GET /api/users/{userId}' expect user by received ID", (done) => {
    const expectedObj = {
      id: tempID,
      username: "Ivan",
      age: 23,
      hobbies: ["football"],
    };
    request.get(`/api/users/${tempID}`).then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(expectedObj);
      done();
    });
  });

  test("'PUT /api/users/{userId}' expect changed user", (done) => {
    const expectedObj = {
      username: "Anton",
      age: 50,
      hobbies: ["sleep", "eat"],
    };
    request
      .put(`/api/users/${tempID}`)
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedObj);
        done();
      });
  });

  test("'DELETE /api/users/{userId}' expect status 204", (done) => {
    request.delete(`/api/users/${tempID}`).then((res) => {
      expect(res.status).toBe(204);
      done();
    });
  });

  test("'GET /api/users/{userId}' expect message 'ID isn't exist'", (done) => {
    request.get(`/api/users/${tempID}`).then((res) => {
      expect(res.status).toBe(404);
      expect(res.body).toEqual("ID isn't exist");
      done();
    });
  });
});

describe("test CRUD scenarios #2", () => {
  let tempID: string;
  test("'POST /api/users' expect received user", (done) => {
    const expectedObj = { username: "Ivan", age: 23, hobbies: ["football"] };
    request
      .post("/api/users")
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        tempID = res.body.id;
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(expectedObj);
        done();
      });
  });

  test("'PATCH /api/users/{userId}' expect 'Method isn't available'", (done) => {
    const expectedObj = { username: "Ivan", age: 23, hobbies: ["football"] };
    request
      .patch(`/api/users/${tempID}`)
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual("Method isn't available");
        done();
      });
  });

  test("'COPY /api/users/{userId}' expect 'Method isn't available'", (done) => {
    const expectedObj = { username: "Ivan", age: 23, hobbies: ["football"] };
    request
      .copy(`/api/users/${tempID}`)
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual("Method isn't available");
        done();
      });
  });

  test("'GET /api/users/{InvalidId}' expect message 'ID is not valid'", (done) => {
    request.get(`/api/users/234456`).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body).toEqual("ID is not valid");
      done();
    });
  });
});

describe("test CRUD scenarios #3", () => {
  let tempID: string;
  test("'GET /people' expect message 'Resource Not Found'", (done) => {
    request.get(`/people`).then((res) => {
      expect(res.status).toBe(404);
      expect(res.body).toEqual("Resource Not Found");
      done();
    });
  });
  test("'POST /api/users' expect received user", (done) => {
    const expectedObj = { username: "Ivan", age: 23, hobbies: ["football"] };
    request
      .post("/api/users")
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        tempID = res.body.id;
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(expectedObj);
        done();
      });
  });
  test("'POST /api/users/{userId}' expect 'Resource Not Found'", (done) => {
    const expectedObj = { username: "Ivan", age: 23, hobbies: ["football"] };
    request
      .post(`/api/users/${tempID}`)
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toEqual("Resource Not Found");
        done();
      });
  });

  test("'POST /api/users/' without required field expect 'Data has wrong format!'", (done) => {
    const expectedObj = { username: "Ivan", hobbies: ["football"] };
    request
      .post("/api/users")
      .send(expectedObj)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual("Data has wrong format!");
        done();
      });
  });
});
