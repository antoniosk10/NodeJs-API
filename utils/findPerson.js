import db from "../db.js";

export const findPerson = id => {
    const index = db.findIndex(el => el.id === id);
    const data = db[index];

    if (index !== -1) {
        return {index, data};
    }

    return false;
};
