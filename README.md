

# Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser)
- [chai](https://www.npmjs.com/package/chai)
- [chai-http](https://www.npmjs.com/package/chai-http)
- [config](https://www.npmjs.com/package/config)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mocha](https://www.npmjs.com/package/mocha)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [morgan](https://www.npmjs.com/package/morgan)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [passport](https://www.npmjs.com/package/passport)
- [passport-jwt](https://www.npmjs.com/package/passport-jwt)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

# Start

To start the api, simply do a `npm start`. We used Nodemon to refresh the work all time you edit files.    
You can config your environment on the `config/default.json` file.

# Environment config for deploy

Deployement config following two steps:

- duplicate `config/env.json.dist` to `config/env.json` and adapt it with the related env. configs
- Uncomment `line 2` on `index.js` and use the same name of the env.

e.g. if file for env is `production.json`, use `process.env.NODE_ENV = 'production'`

# Database

To start working well, keep in mind to import fixtures located on `myFonciaBdd` into MongoDB database:

```shell
mongorestore -d <database_name> <directory_backup>
```

e.g. `mongorestore -d myFonciaBdd ./myFonciaBdd`

if you prefered to use a graphical tool, you can simply import data with [MongoDB Compass](https://www.mongodb.com/products/compass)

# Tests

To test, use `npm test`. All routes are tested with Chai/Chai-http and runned under Mocha.    
If you need to add more tests, use the same feature file name, in `test`folder.

# Api doc

The api is documented with swagger, and you can access to the doc through the link [http://localhost:3000/api-doc](http://localhost:3000/api-doc).    
To edit the doc, use the `swagger.json` file on the root of project.

# Scaffolding

- `index.js` is the root project file
- each routes are scoped into features, in `features` folder
- tests are in the `test` folder
- configurations for api are on `config` folder
- `myFonciaBdd` folder contain fixtures (bson & json format)
- `schema` folder contain all Mongoose schema