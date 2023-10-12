const joi=require('joi')
const uservalid=joi.object(
    {
        username:joi.string().required(),
        password:joi.string().required(),
        email:joi.string()

    }
)
module.exports={uservalid}