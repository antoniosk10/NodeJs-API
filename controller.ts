import { v4 as uuidv4 } from "uuid";
import db from "./db";
import { BodyRequest, DBItem, Response } from "./types";
import { dataIsValid } from "./utils/dataIsValid";
import { findPerson } from "./utils/findPerson";

const response: Response = { status: 200, message: "OK" };

const getPerson = (_: DBItem, id: string) => {
  response.status = 200;

  if (id) {
    response.data = db.filter((item) => item.id === id);

    if (response.data.length) {
      return response;
    }

    response.data = null;
    response.status = 404;
    response.message = "ID isn't exist";
    return response;
  }

  response.data = db;
  return response;
};

const addPerson = (bodyRequest: BodyRequest) => {
  if (dataIsValid(bodyRequest)) {
    const newId: string = uuidv4();
    const newField: DBItem = { ...bodyRequest, id: newId };
    db.push(newField);
    response.status = 201;
    response.data = newField;
    return response;
  }

  response.data = null;
  response.status = 400;
  response.message = "Data has wrong format!";
  return response;
};
const updatePerson = (bodyRequest: BodyRequest, id: string) => {
  const person = findPerson(id);

  if (person) {
    if (dataIsValid(bodyRequest)) {
      db[person.index] = { ...db[person.index], ...bodyRequest };
      response.data = db[person.index];
      return response;
    }
    response.data = null;
    response.status = 400;
    response.message = "Receive required fields!";
    return response;
  }

  response.data = null;
  response.status = 404;
  response.message = "ID isn't exist";
  return response;
};
const deletePerson = (_: DBItem, id: string) => {
  const person = findPerson(id);
  response.data = null;

  if (person) {
    db.splice(person.index, 1);
    response.status = 204;
    response.message = "DELETED";
    return response;
  }

  response.status = 404;
  response.message = "ID isn't exist";
  return response;
};
export const controller = {
  GET: getPerson,
  POST: addPerson,
  PUT: updatePerson,
  DELETE: deletePerson,
};
