import db from "../db";

export const findPerson = (id: string) => {
  const index = db.findIndex((el) => el.id === id);
  const data = db[index];

  if (index !== -1) {
    return { index, data };
  }

  return false;
};
