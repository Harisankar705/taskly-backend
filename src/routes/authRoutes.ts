import { Router } from "express";
import { AuthController } from "../controllers/authController";

export const authRoutes=(authController:AuthController)=>{
    const router=Router()
    router.post('/signup',authController.signup)
    router.post('/login',authController.login)
    return  router

}