import {Router} from 'express';
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js';
import verifyJwt from '../middlewares/verifyJwt.js';
const router = Router();

router.route("/:videoId").post(verifyJwt,createComment)
router.route("/:id").delete(verifyJwt,deleteComment);
router.route("/:videoId").get(getComments);

export default router;