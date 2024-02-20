const User = require('../model/User');

const handleLogout = async(req, res) => {
    // on client, also delete the accessToken
    
    const cookies = req.cookies
      if(!cookies?.jwt) return res.sendStatus(204);//No content   
      const refreshToken = cookies.jwt;
     
      // Is refreshToken i the db?
     const foundUser = await User.findOne({refreshToken}).exec();
     if(!foundUser){
         res.clearCookie('jwt', {httpOnly: true, sameSite:'None', secure: true});
        return res.sendStatus(403); // No content
       }
       foundUser.refreshToken = '';
       const result = await foundUser.save();
       console.log(result);
      
      res.clearCookie('jwt',{httpOnly:true,sameSite:'None', secure:true}) // secure: true - only serves
     res.sendStatus(204);// No content
}
module.exports = { handleLogout };