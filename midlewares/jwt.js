const {verify, sign} = require('jsonwebtoken')

async function createToken(user){
    return await sign(user, process.env.SECRET_KEY)
}


async function verifyToken(req, res, next) {
	
	const token = req.cookies['ACCESS_TOKEN']
	try{
        if(!token){
			res.status(403).json({
				status:false,
				message:'invalid token'
			});
			return
		} 
       
		verify(token, process.env.SECRET_KEY, (err, user)=>{
			if(err) return res.status(200).json({
				status:false,
				message:'You do not have valid token'
			});
			req.user = user
			return next();
		});

	}catch(err){
		console.log(err)
		return res.status(500).send('Internal Server Error');
	}
}

module.exports = {createToken, verifyToken}