import { sql } from "../database/database.js";

const create = async (sender, message) => {
  await sql`INSERT INTO messages (sender, message)
    VALUES (${sender}, ${message})`;
};

const deleteById = async (id) => {
  try {
    await sql`DELETE FROM addresses WHERE id = ${id}`;
  } catch (e) {
    console.log(e);
  }
};

const findAll = async () => {
  return await sql`SELECT * FROM messages ORDER BY id DESC
  LIMIT 5;`;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
  const likePart = `%${nameOrAddress}%`;

  return await sql`SELECT * FROM addresses
    WHERE name ILIKE ${namePart} OR address ILIKE ${namePart}`;
};

// const measure = async () => {
//   try {
//     await sql`SELECT AVG(measurement)
//   FROM measurements
//   WHERE measurements BETWEEN 0 AND 1000;`;
//   } catch (e) {
//     console.log("Not enough measurements for calculating the average.");
//   }

//   return rows[0].count;
// };
export { create, deleteById, findAll, findByNameOrAddressLike };
