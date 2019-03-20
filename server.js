const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
//middleware
function bouncer (req, res, next){
  res.status(404).json('these are not the dorids yo are looking for');
}

function teemo(req, res, next){
  req.team = 'Web Seventeen';
  next(); // go ahead and exucute next route handler
}

//server.use(bouncer);
server.use(express.json());
server.use(helmet());
server.use(teemo);
//...

server.use('/api/hubs', hubsRouter);

server.get('/', restricted (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

function restricted(req,res,next){
  const password = req.headers.password;

  if(password == 'mellon'){
    next();
    }
    else{
      res.status(401).send('Bad Pass');
    }
  }


module.exports = server;
