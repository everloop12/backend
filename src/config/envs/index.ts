import development from './config.dev';

const env = process.env.NODE_ENV || 'development';

const configurations = {
  development,
};
const config = configurations[env];
export default config;
