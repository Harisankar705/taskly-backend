import { IAuthService, ILoginResponse, IUser } from '../interfaces/interfaces';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import { generateRefreshToken, generateToken } from '../utils/jwtUtils';
import { UserRepository } from './../repositories/userRepository';
import { OAuth2Client } from 'google-auth-library';
const client=new OAuth2Client(process.env.AUTH_GOOGLE_ID)
export class AuthService implements IAuthService{
    constructor(private userRepository:UserRepository){}
    async login(email:string,password:string,role:"Manager"|"Employee"):Promise<ILoginResponse>{
        try {
            const user=await this.userRepository.findByEmail(email)
            if(!user)
            {
                throw new Error(" User not found! Try again!")
            }
            if(user.role!==role)
            {
                throw new Error("User not found!Try signup!")
            }
            const isMatch=await comparePassword(password,user.password!)
            if(!isMatch)
            {
                throw new Error("Invalid password!")
            }
            const payload={
                userId:user._id!.toString(),
                role:user.role as 'Manager'|'Employee'
            }
            const accessToken:string=generateToken(payload)
            const refreshToken:string=generateRefreshToken(payload)
            return {accessToken,refreshToken,user}
        } catch (error) {
            throw new Error(error as string)
        }
    }
    async register(userData:IUser):Promise<IUser>{
        const existingUser=await this.userRepository.findByEmail(userData.email as string)
        if(existingUser)
        {
            throw new Error("User already exists!")
        }
        const hashedPassword=await hashPassword(userData.password as string)
        const newUser={...userData,password:hashedPassword,isGoogle:false}
        const user=await this.userRepository.create(newUser)
        return user
    }
    async verifyGoogleToken(token:string){
        try {
            const ticket=await client.verifyIdToken({
                idToken:token,
                audience:process.env.AUTH_GOOGLE_ID
            })
            return ticket.getPayload()
        } catch (error) {
            
        }
    }
    

}