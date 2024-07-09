import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register
export const registerController = async (req,res) => {
try {
    const existingUSer = await userModel.findOne({email:req.body.email})
     if(existingUSer){
        res.status(200).send({
            success:false,
            message:'User already exist',
           })
     }

     const salt = await bcrypt.genSalt(10)
     const hashedPsssword = await bcrypt.hash(req.body.password,salt)
     req.body.password = hashedPsssword


     // res data
     const user = new userModel(req.body);
     await user.save()
     return res.status(201).send({
        success:true,
        message:'User registered successfully',
        user
       })
} catch (error) {
   console.log(error); 
   res.status(500).send({
    success:false,
    message:'Error in Register API',
    error
   })
}
}



// login
export const loginController = async (req,res) =>{
   try {
      const user = await userModel.findOne({email:req.body.email});

      // check user 
      if(!user){
       return  res.status(404).send({
            success:false,
           message:'Invalid credentials',
         })
      }
      // check role
      if(user.role !== req.body.role){
         return res.status(500).send({
            success:false,
            message: 'role doesnot match',
         })
        }
   
      const comparePassword = await bcrypt.compare(req.body.password,user.password);
      if(!comparePassword){
         return res.status(500).send({
            success:false,
           message:'Invalid credentials',
         })
      }
     const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
     return  res.status(200).send({
      success:true,
     message:'Login successfully',
     token,user
   })

   } catch (error) {
      console.log(error); 
   res.status(500).send({
    success:false,
    message:'Error in Login API',
    error
   })
   }
}

//get current user 

export const currentUserController = async (req,res) =>{
   try {
      const user = await userModel.findOne({_id:req.body.userId})
      return res.status(200).send({
         success: true,
         message:'User fetched successfully',
         user
      })

     
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success:false,
         message: 'unable to get current user',
         error
      })
   }
}