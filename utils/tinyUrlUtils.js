// const pool = require("../dbConnection");

const createTinyUrl = async (url) => {
  try {
    const conn = await pool.getConnection();

    const addContact = await conn.query(
      `INSERT INTO contacts(name, email, phone, owner) VALUES('${name}', '${email}', '${phone}', ${ownerID})`
    );

    const newContact = await getContactById(addContact.insertId, ownerID);

    conn.close();

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTinyUrl,
};

// let hashedUrl = Math.random()
//   .toString(32)
//   .replace(/[^a-z0-9]/gi, "")
//   .substring(2, 10);

//   console.log(hashedUrl);

const hashedUrl = Math.random()
  .toString(32)
  .replace(/[^a-z0-9]/, "")
  .substring(2, 10);

const tinyUrl = process.env.DEV_URL + hashedUrl;

console.log("------hashedUrl------", hashedUrl);
console.log("------tinyUrl------", tinyUrl);

// ------------- end
