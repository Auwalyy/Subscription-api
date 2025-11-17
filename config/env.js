import { config } from 'dotenv';

// Determine environment
const environment = process.env.NODE_ENV || 'development';

// Load the appropriate .env file
config({ path: `.env.${environment}.local` });

export const { PORT } = process.env;