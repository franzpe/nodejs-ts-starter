# Nodejs Typescript scaffold

Technologies - Nodejs, Express, Typescript, Redis (for caching only), TypeORM, MySQL, Swagger (docs), PM2, morgana + winston (logging)

NPM SCRIPTS:
npm run dev - runs development server and watches for every .ts file change
npm run build - transpiles .ts files to .js (to dist folder)
npm start - starts pm2 locally with production env
npm run test - run tests

Base route: /api/{version}/{route}

Testing:
Tests files - {filename}.test.{extension}
Unit-testing - jest
Integration-testing - supertest

cross-cutting concerns:

Logging - JSON Format - Logging each request with Morgan
