import {Router} from 'express';
import { sample_foods, sample_tags } from '../mock-data';
import { FoodModel } from '../models/food.model';

const router = Router();

router.get('', (req,res) => {
    res.send(sample_foods)
})

router.get('/search/:searchTerm', (req,res) => {
    const { searchTerm } = req.params;
    const foods = sample_foods.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods)
})


router.get('/tags', (req,res) => {
    res.send(sample_tags)
})

router.get('/tags/:tagName', (req,res) => {
    const { tagName } = req.params;
    const foods = sample_foods.filter(f => f.tags?.includes(tagName));
    res.send(foods)
})

router.get('/:foodID', (req,res) => {
    const { foodID } = req.params;
    const food = sample_foods.filter(f => f.id === foodID);
    res.send(food)
})




export default router;























// import { getSeed, getAll, getSearch, getAllTag, getSingleTag, getSignleFood } from '../controllers/foodControllers'

// router.get("/seed", getSeed)
// router.get("/", getAll)
// router.get("/search/:searchTerm", getSearch)
// router.get("/tags", getAllTag)
// router.get("/tag/:tagName", getSingleTag)
// router.get("/:foodId", getSignleFood)