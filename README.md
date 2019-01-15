# [Login Application](http://206.189.143.206:3000)

If you want to check a live demo of the project, please click [here](http://206.189.143.206:3000).

## Steps to run this project

1. Clone the project.
2. If you don't have node 8.9.4, use nvm to install node 8.9.4 by following the steps [here](https://gist.github.com/d2s/372b5943bce17b964a79)
3. Install MongoDB 3.4.3 from [here](https://www.mongodb.com/download-center#community)
4. Install Redis 3.2.8 from [here](https://redis.io/download)
5. Open the project in terminal and run `yarn`.
6. To start the application, supply env variables such as `MONGO_URL`, `REDIS_PORT`, `REDIS_HOST` and `REDIS_AUTH` and then run `node bin/www` or `npm start`.
7. Hit `http://localhost:3000/` to start the application .

## Functionalities

1. When you open the webpage, you will land on `/signin` page where you can give your username and password to signin or you can `/signup`.
2. Signup `/signup` has a form with username, email, first name, last name and password. After successful signup, this redirects to `/user` where you can see the user details and can update them.
3. In user details page, a form with pre-filled user data will be available, which you can update.
4. You can check the API documentation here: `http://206.189.143.206:3000/api-docs`
5. Users can logout using `/logout`.

## Test cases

1. To run test cases, you need to install mocha using `npm install -g mocha` and run `mocha` in the terminal for test.js file.
2. There are two test cases such as: 

- Sign up, sign in, see user details and update an user 
- Duplicate username and invalid credentials

## Caching mechanism

Redis session caching is done for storing the user session.

## Assumptions

1. In a real world scenario, the website will be served over SSL. We can use [letsencrypt](https://letsencrypt.org/) for the same.
2. In a production deployment, all the servers will have firewall and password protection.
3. In a production setting, we will use a reverse proxy like nginx and the content will be served on 80/443 rather than 3000.
4. For the sake of simplicity, only first name, last name and email can be updated.

## Server Details

1. We are deployed on DigitalOcean.
2. There are total 3 servers: Node.js, Redis and MongoDB.
3. We are using pm2 to manage and deploy our Node.js process.