const {db} = require('../DBConfig.js')
const {filter} = require('./Util')

const AQLUserBoards = (id) => `FOR v IN 1..1 OUTBOUND ${id} onboard RETURN v`;

const AQLUserPersonalBoard = (id) => `FOR v,e,p IN 1..1 OUTBOUND "users/${id}" onboard 
FILTER p.edges[*].personal ALL == true
for x in inbound v._id inboard
RETURN {board : {id: v._id, name : v.name}, commandment : {id: x._id, text: x.text, author: x.author}}`;

const AQLBoardCommandments = (id) => `FOR v IN 1..1 INBOUND ${id} inboard RETURN v`;

const path2aql = {
  userboards : AQLUserBoards,
  personal : AQLUserPersonalBoard
}

const fetchById = async (req, res , aql) => {
  const obj =  req.query
  console.log(obj,path2aql[aql](obj.id))
  try {
    const data = await db.query(path2aql[aql](obj.id)).then(
            cursor => cursor.all()
            ).then(
              data => data,
              err =>  []
            );      
    res.status(200).json({data: data})           
  }catch(err){
    res.status(400).json({err: err.message})
  }
}

const fetchCommandments = async (req, res) => {
  const obj =  req.query
  try {
    const commandments = await db.query(`FOR u IN commandment ${filter(obj)} return u`).then(
            cursor => cursor.all()
            ).then(
              commandment => commandment,
              err =>  []
            );
    console.log(commandments)        
    res.status(200).json({commandments:commandments})           
  }catch(err){
    res.status(400).json({err:err.message})
  }
}

module.exports = {
  fetchCommandments, 
  fetchById
}