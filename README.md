

# Dependencies

- Express
- config
- nodemon
- mocha
- chai

# Start

To start the api, simply do a `npm start`. We used Nodemon to refresh the work all time you edit files.
You can config your environment on the `config/default.json` file.

# Environment config for deploy

Deployement config following two steps:

- duplicate `config/default.json` to `your-env.json` and adapt it with the related env. configs
- Uncomment `line 2` on `index.js` and use the same name of the env.

e.g. if file for env is `production.json`, use `process.env.NODE_ENV = 'production'`

# Database

To start working well, keep in mind to import fixtures located on `myFonciaBdd` into MongoDB database:

```shell
mongorestore -d <database_name> <directory_backup>
```

e.g. `mongorestore -d myFonciaBdd ./myFonciaBdd`

if you prefered to use a graphical tool, you can simply import data with [MongoDB Compass](https://www.mongodb.com/products/compass)