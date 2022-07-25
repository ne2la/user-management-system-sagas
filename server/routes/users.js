import express from "express";
import userController from "../controllers/user.js";

const router = express.Router();

router.post('/signin',userController.signin);
router.post('/signup',userController.signup);

router.post('/forgotPassword',userController.forgotPassword);
router.put('/resetPassword/:id/:token',userController.resetPassword);

router.put('/confirmEmail/:id/:token',userController.confirmEmail);

export default router;