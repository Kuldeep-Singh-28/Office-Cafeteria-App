const  auth = async (req, res, next)=> {
  
    if(req.user.role === "customer")
     {
       return next();
     } 
   return res.redirect("/admin/orders");
 }
 
 module.exports = auth;
 