import {Router} from 'express';
import { deleteUser, dislikeUser, getUser, likeUser, subscribe, unsubscribe, updateUser } from '../controllers/user.controller.js';
import verifyJwt from '../middlewares/verifyJwt.js';
const router = Router();

router.route("/:id").patch(verifyJwt,updateUser).delete(verifyJwt,deleteUser).get(getUser);
router.route("/sub/:id").patch(verifyJwt,subscribe);
router.route("/unsub/:id").patch(verifyJwt,unsubscribe);
router.route("/like/:videoId").patch(verifyJwt,likeUser);
router.route("/dislike/:videoId").patch(verifyJwt,dislikeUser);

export default router;