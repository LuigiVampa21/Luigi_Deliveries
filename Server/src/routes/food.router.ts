import {Router} from 'express';
// import { sample_foods, sample_tags } from '../mock-data';
import { FoodModel } from '../models/food.model';


const router = Router();

router.get('', async (req,res) => {
    const foods = await FoodModel.find();
    res.status(200).send(foods)
});

router.get('/search/:searchTerm', async (req,res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');
    const foods = await FoodModel.find({name: {$regex:searchRegex}});
    res.status(200).send(foods)
})


router.get('/tags', async (req,res) => {
    const tags = await FoodModel.aggregate([
        {
            $unwind:'$tags'
        },
        {
            $group:{
                _id:'tags',
                count:{$sum: 1}
            }
        },
        {
            $project:{
                _id: 0,
                name:'$_id',
                count: '$count'
            }
        }
    ]).sort({count:1});

    const all = {
        name: 'All',
        count: await FoodModel.countDocuments()
    }
    tags.unshift(all)
    res.status(200).send(tags)
})

router.get('/tags/:tagName', async (req,res) => {
    const { tagName } = req.params;
    const foods = await FoodModel.find({tags: tagName});
    res.status(200).send(foods)
})

router.get('/:foodID', async (req,res) => {
    const { foodID } = req.params;
    const food = await FoodModel.findById(foodID);
    res.status(200).send(food)
})




export default router;
























function asyncHandler(_arg0: (req: any, res: any) => Promise<void>) {
    throw new Error('Function not implemented.');
}
// import { getSeed, getAll, getSearch, getAllTag, getSingleTag, getSignleFood } from '../controllers/foodControllers'

// router.get("/seed", getSeed)
// router.get("/", getAll)
// router.get("/search/:searchTerm", getSearch)
// router.get("/tags", getAllTag)
// router.get("/tag/:tagName", getSingleTag)
// router.get("/:foodId", getSignleFood)