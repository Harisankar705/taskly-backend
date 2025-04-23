export const validateRole=(role:string)=>{
    if(!['Manager',"Employee"].includes(role))
    {
        return {valid:false,message:"Role is invalid!"}
    }
    return {valid:true}
}