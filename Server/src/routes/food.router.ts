import {Router} from 'express';
import { getSeed, getAll, getSearch, getAllTag, getSingleTag, getSignleFood } from '../controllers/foodControllers'

const router = Router();

router.get("/seed", getSeed)
router.get("/", getAll)
router.get("/search/:searchTerm", getSearch)
router.get("/tags", getAllTag)
router.get("/tag/:tagName", getSingleTag)
router.get("/:foodId", getSignleFood)


export default router;