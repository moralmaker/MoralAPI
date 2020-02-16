const {db} = require('../DBConfig.js')

const authenticate = async (req,res,next,status=408) => {
  const obj = req.type === 'GET' ? req.query : req.data 
  const { UserUID, Identifier } =  obj.user
  const user = await db.query(`FOR u IN users FILTER u.UserUID=='${UserUID}' AND u.Identifier=='${Identifier}' return u`).then(
  	cursor => cursor.all()
  	).then(
	  	user => user,
	  	err => console.error('Failed to execute query:', err)
  	);
  const isAuth = UserUID && Identifier && user ? true : false   
  if (!isAuth)  {
    res.status(status).json({err : 'Not Authorized'})
    return isAuth
  } else return next(user);  
}

const signup = async (req, res) => {
  try{
     const newUser =  req.body
     const {UserUID,Identifier} = newUser
     delete newUser.UserUID
     newUser._key = UserUID
     if (Identifier && UserUID) {
  	   	const user = await db.query(`FOR u IN users FILTER u._key=='${UserUID}' AND u.Identifier=='${Identifier}' return u`).then(
  	  	cursor => cursor.all()
  	  	).then(
  		  	user =>  user,
  		  	err =>  []
  	  	);
  	  	if (!user[0]) return await db.collection('users').save(newUser)
    	}else{
        throw new Error("Bad SignUp Data")
    	}
    }catch(err){
       throw new Error("NO DB")
    }
}

const fetchUsers = async (req, res) => {
  try {
    const users = await db.query(`FOR u IN users return u`).then(
            cursor => cursor.all()
            ).then(
              user =>  user,
              err =>  []
            );
    res.status(400).json({users:users})           
  }catch(err){
    res.status(400).json({err:err.message})
  }
}

module.exports = {
  signup, authenticate , fetchUsers
}