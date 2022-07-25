import express  from "express";
import userPostController from "../controllers/userPost.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/',userPostController.getPosts);
router.post('/createPost',auth,userPostController.createPost);
router.put('/updatePost/:id',auth,userPostController.updatePost);
router.delete('/deletePost/:id',auth,userPostController.deletePost);

export default router;
