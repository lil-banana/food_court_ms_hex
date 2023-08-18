require('dotenv').config();
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = +process.env.DB_PORT || 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;