
//ESTE ES EL QUE VERIFICA SI ALGUIEN ESTA AUTENTICADO
const helpers = {}

//ESTA ES PARA SABER SI ESTA LOGUEADO
helpers.isAuthenticated = (req, res, next) =>{
  if(req.isAuthenticated()){
    //SI ESTA AUTENTICADO
    return next();
  }
  //NO ES NECESARIO LLEVARLO ACA.. SINO A DONDE QUERAMOS
  res.redirect('/');
}

//ESTA ES PARA SABER SI EL USUARIO ES ADMIN
helpers.isAdmin = (req,res,next)=>{
  if (req.user.isAdmin){
    return next()
  }
  res.redirect('/')
}

module.exports = helpers;
