import bcrypt from 'bcryptjs'
export const hashPassword=async(password:string):Promise<string>=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const hashed=await bcrypt.hash(password,salt)
        return hashed
    } catch (error) {
       throw error 
    }
}
export const comparePassword=async(password:string,storedHash:string):Promise<boolean>=>{
    try {
        const isMatch=await bcrypt.compare(password,storedHash)
        return isMatch
    } catch (error) {
        throw error
    }
}