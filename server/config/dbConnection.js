import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const databaseUrl = process.env[env.toUpperCase() + '_DATABASE_URL'];

export default databaseUrl;
