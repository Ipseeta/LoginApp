# [Login Application](http://206.189.143.206/)

If you want to check a live demo of the project, please click [here](http://206.189.143.206).

## Steps to run this project

1. Clone the project.
2. If you don't have node 8.9.4, use nvm to install node 8.9.4 by following the steps [here](https://gist.github.com/d2s/372b5943bce17b964a79)
3. Install MongoDB 3.4.3 from [here](https://www.mongodb.com/download-center#community)
4. Install Redis 3.2.8 from [here](https://redis.io/download)
5. Open the project in terminal and run `yarn`.
6. To start the application, supply env variables such as `MONGO_URL`, `REDIS_PORT`, `REDIS_HOST` and then run `node bin/www` or `npm start`.
7. Hit `http://localhost:3000/` to start login application .

## Functionalities

1. On project startup, you will be landing on `/signin` page where you can give your username and password to signin or you can `/signup`.
2. Signup `/signup` has a form with username, email, first name, last name and password. After successful signup, this redirects to `/user` where you can see the user details and can update them.
3. In user details page, a form with pre-filled user data will be there, which you can update.
4. You can check the api documentation here `http://localhost:3000/api-docs`
5. User can logout using `/logout`.

## Test cases

1. To run test cases, you need to install mocha using `npm install -g mocha` and run `mocha` in the terminal.
2. There are test cases: 1) Sign up, sign in, see user details and update an user 2) Duplicate username and invalid credentials

## Caching mechanism

Redis session caching is done for storing the user until logged out.
