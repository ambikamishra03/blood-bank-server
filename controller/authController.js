export const registerController = async (req,res) =>{
   try {
      console.log('auth controller');
   }catch (error) {
    console.log(error.message);
    res.status(500).send({
        sucess : false,
        message:'Error in register api',
        error
     })
   }
}

