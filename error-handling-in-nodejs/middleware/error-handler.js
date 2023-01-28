//in order to tell express, this is specificily error handling middleware, we need to pass 4 argument(with error) instead of 3.
 
//so whenever we call next in any controller and pass a parameter, that will tell express, the error that we want to pass on , and we will get access to the error through the first parameter. 

//so here we want to process the error and return the response 
const errorHandler = (error,req,res,next)=>{
    //copy the error statement from catch block and just pass next() there instaed of this
    return res.status(400).send(error.message);
}

module.exports = errorHandler
