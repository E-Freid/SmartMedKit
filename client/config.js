import dotenv from 'dotenv';

dotenv.config();

const envModeEnum =  {
  DEV: 'development',
  PRODUCTION: 'production',
}

const isDevelopment = process.env.NODE_ENV === envModeEnum.DEV;

const config = {
  apiUrl: isDevelopment ? process.env.REACT_APP_API_URL_DEVELOPMENT : process.env.REACT_APP_API_URL_PRODUCTION,
};

export default config;