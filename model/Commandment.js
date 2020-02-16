const {db} = require('../DBConfig.js')
const {filter} = require('./Util')

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
}