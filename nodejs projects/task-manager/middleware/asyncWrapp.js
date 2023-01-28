//to get rid of try and catch block, we will wrap them in async wrapper function
const asyncWrapper = (controller)=> {
    return async (req,res,next) =>{
        try {
            await controller(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper