import User from '../models/userModel'

export const searchContacts = async (req,res,next)=>{
    try{
      const {searchTerm} = req.body
      if(searchTerm == undefined || searchTerm == null) return res.status(400).send("searchTerm is required")
      const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")
      const regex = new RegExp(sanitizedSearchTerm,"i")

      const contacts = await User.find({
         $and:[
            {_id:{$ne:requestAnimationFrame.userId}},
            {
               $or:[{firstName: regex},{lastName:regex},{email:regex}]
            }
         ]
    })
      return res.status(200).json({contacts})
     }catch(err){
        console.log({err})
        res.status(500).send("Internal server error")
     }
  }
  