const {db} = require('../DBConfig.js')

const addC = async (req, res) => {
  try{
     const newC =  req.body
     const { uid, boardId, commandment } = newC
     const { text } = commandment
     if (text) {
      const C = await db.collection('commandment').save(newC)
      console.log("CCCC:",C)
      const I = await db.collection('inboard')save({_from: C._id, _to: board_id})
      }else{
        throw new Error("Bad SignUp Data")
    	}
    }catch(err){
       throw new Error("NO DB")
  }
}


module.exports = {
  addC
}