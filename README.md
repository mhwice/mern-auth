### MERN Authentication, Authorization & Routing

#### Technologies Used
- React
- React Router
- Bcrypt
- Axios
- Express
- Express Validator
- JSON Web Token
- Nodemailer (for email sending)
- Mongoose
- MongoDB Atlas
- Node.js
- Vite
- Git
- NPM

#### This codebase is used to explore different technologies and full-stack concepts.

- authentication
- authorization
- public/protected routes
- react router actions/loaders
- forms
- form validation (both frontend and backend)
- JWTs in headers vs cookies
- authentication strategies (acces tokens, refresh tokens, etc.)
- express middleware
- express layered design (http layer, logic layer, database layer)
- email sending with nodemailer
- vite compared to webpack
- express validator for server-side request validation

##### Things I'd like to explore further
- I would like to know how authentication is handled in a meta-framework like NextJS before I spend too much time on authentication.
- I would like this know how authentication is handled in a microservices architecture.
- I would like to Dockerize this project

##### Things I've learned
- Authentication is hard. There doesn't seem to be a "best" way to do anything. A popular technique is the Access + Refresh token idea using both token in headers and tokens in HTTP-only cookies.
- Vite is much easier to work with than Webpack!
- There are so many JS libraries it can be really hard to know which to use. This seems like part of the motivation for React meta-framworks like NexJS and Remix.
- I learned how to create a useAuth hook and ProtectedRoute compoonent for handling frontend authentication.
- I feel very comfortable working with Express.
