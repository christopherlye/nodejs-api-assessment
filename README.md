<h1 align="center">NodeJS API Assessment</h1>
<p align="center">NodeJS API Assessment : A technical assessment on nodeJS and mySQL</p>
<br>
<p align="center"><img src="https://github.com/christopherlye/nodejs-api-assessment/blob/master/highlight.png" alt="NodeJS API Assessment" width="100%"></p>

---

## Background

<p align="justify">Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.</p>

---

## Approach

In summary:

1. Create project structure – models & controllers
2. Create typical CRUD routes
   - Students
   - Teachers
3. Create special routes
   - /api/register
   - /api/commonstudents
   - /api/retrievefornotifications
4. Explore & connect to MySQL and ensure data is saved & persists for each route
5. Explore and include unit tests using Jest
6. Documentation

---

## Installation

### Requirements

- nodeJS installed
- mySQL installed

### Steps

These are the installation steps if you would like to view the project locally:

<summary>Running Locally:</summary>

Step 1: Clone the repository

```
git clone https://github.com/christopherlye/nodejs-api-assessment.git
```

Step 2: Install npm dependencies

```
npm i
```

Step 3: Create a .env file

```
touch .env
```

Step 4: Customise your environment variables according to your mysql database credentials.

For example:

```
PORT=9000
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="password"
DB_DATABASE="nodejs"
DB_PORT=3306
```

Step 5: Start "MySQLWorkbench"

Step 6: Run server

```
npm start
```

---

## Roadmap

### Ideas

- Validate the incoming data first before handling the request
- Explore using JEST for unit testing
- Explore using Sequelize over using mysql
- Explore Mocha & Chai
- Deepen knowledge of sql and backend in general
- Create seed data for user that automatically creates the database, tables and records

---

## TechStack

- nodeJS
- expressJS
- JavaScript
- mysql

---

## Support

### Known Issues / Feedback

- Request body is not thoroughly validated
- Possibility of having malicious entries submitted by the user
- Need to continue working on the sending of data to the mysql database
- Schema and table have to be created first by the user
- Code not yet refactored

---

## Authors

- Christopher Lye

---

## Acknowledgements

Thanks to GT for the opportunity to take this assignment.

---

## License

| S/N | License                                         |
| --- | ----------------------------------------------- |
| 1   | [MIT](https://choosealicense.com/licenses/mit/) |
