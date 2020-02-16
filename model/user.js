const {db} = require('../DBConfig.js')

const authenticate = async (req,res,next,status=408) => {
  const obj = req.type === 'GET' ? req.query : req.data 
  const { UserUID, Identifier } =  obj.user
  const user = await db.query(`FOR u IN users FILTER UserUID=${UserUID} FILTER Identifier=${Identifier} d.value ASC RETURN u`).then(
  	cursor => cursor.all()
  	).then(
	  	user => return user,
	  	err => console.error('Failed to execute query:', err)
  	);
  const isAuth = UserUID && Identifier && user ? true : false   
  if (!isAuth)  {
    res.status(status).json({err : 'Not Authorized'})
    return isAuth
  } else return next(user);  
}

const signup = (request, response, next) => {
   const user = request.body
   if (user.Identifier && user.UserUID) {
	   	const user = await db.query(`FOR u IN users FILTER UserUID=${UserUID} FILTER Identifier=${Identifier} d.value ASC RETURN u`).then(
	  	cursor => cursor.all()
	  	).then(
		  	user => return user,
		  	err => return null
	  	);

	  	if (!user) 	return await db.collection('users').save(user)
  	}else{
  		throw new Error("Bad SignUp Data")
  	}
}


module.exports = {
  signup, authenticate 
}