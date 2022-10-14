import { sample_foods, sample_tags } from '../mock-data';
import asyncHandler from 'express-async-handler';
import { FoodModel } from '../models/food.model';

export const getSeed = asyncHandler(
    async (req, res) => {
       const foodsCount = await FoodModel.countDocuments();
       if(foodsCount> 0){
         res.send("Seed is already done!");
         return;
       }
   
       await FoodModel.create(sample_foods);
       res.send("Seed Is Done!");
   }
   )
   
   
export const getAll = asyncHandler(
     async (req, res) => {
       const foods = await FoodModel.find();
         res.send(foods);
     }
   )
   
export const getSearch =  asyncHandler(
     async (req, res) => {
       const searchRegex = new RegExp(req.params.searchTerm, 'i');
       const foods = await FoodModel.find({name: {$regex:searchRegex}})
       res.send(foods);
     }
   )
   
export const getAllTag =  asyncHandler(
     async (req, res) => {
       const tags = await FoodModel.aggregate([
         {
           $unwind:'$tags'
         },
         {
           $group:{
             _id: '$tags',
             count: {$sum: 1}
           }
         },
         {
           $project:{
             _id: 0,
             name:'$_id',
             count: '$count'
           }
         }
       ]).sort({count: -1});
   
       const all = {
         name : 'All',
         count: await FoodModel.countDocuments()
       }
   
       tags.unshift(all);
       res.send(tags);
     }
   )
   
export const getSingleTag = asyncHandler(
     async (req, res) => {
       const foods = await FoodModel.find({tags: req.params.tagName})
       res.send(foods);
     }
   )
   
export const getSignleFood = asyncHandler(
     async (req, res) => {
       const food = await FoodModel.findById(req.params.foodId);
       res.send(food);
     }
   )
