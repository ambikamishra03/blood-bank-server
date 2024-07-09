import inventoryModel from '../models/inventoryModel.js';
import userModel from '../models/userModel.js'

export const inventoryController = async (req,res) =>{
   try {
    // validation
    const {email,inventoryType} = req.body
   const user = await userModel.findOne({email})
      console.log(user);
     if(!user){
         throw new Error('User not found')
     }
     if(inventoryType === 'in' && user.role !== 'donar'){
         throw new Error('Not a donar account')
     }
     if(inventoryType === 'out' && user.role !== 'hospital'){
         throw new Error('Not a  hospital')
     }

     const inventory = new inventoryModel(req.body)
     await inventory.save();

     return res.status(200).send({
        success:true,
        message:'New Blood record added'
     })
   } catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:'Error in create inventory api',
        error
    })
   }
}


export const getInventryController  = async (req,res) => {
try {
    const inventory = await inventoryModel.findOne({
        organization:req.body.organization,
        inventoryType:req.body.inventoryType
    }).populate('donar').populate('hospital').sort({createdAt:-1})
    if(!inventory){
        throw new Error('Inventory not found')
    }
    res.status(200).send({
        success:true,
        message:'Inventory found successfully',
        inventory
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in fetching inventory data',
        error
    })
}
}