const {authenticate, signup, fetchUsers} = require('./model/User')
const {fetchCommandments} = require('./model/Commandment')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: "50mb"})) 
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const cors = require('cors')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 4001;
const router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private') ;
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', router);

router.post('/signup', async (req,res) => {
    try{
      await signup(req,res)
      res.status(201).json({signup : true})
    } catch(err) {
      console.log("eeee:",err)
      res.status(400).json({error:err.message})
    }
 })

router.get('/',  (req,res) => res.status(201).json({main:2}))
router.get('/users',  async (req,res) => await fetchUsers(req,res))
router.get('/commandments',  async (req,res) => await fetchCommandments(req,res))

router.get('/resources', async (req,res) => await User.authenticate(req,res,() => fetchResources(res))) 

app.listen(port);
console.log('Magic happens on port ' + port);
