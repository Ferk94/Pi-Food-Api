const express = require("express");
require("dotenv").config();
const {DB_APIKEY, DB_APIKEY2, DB_APIKEY3, DB_APIKEY4, DB_APIKEY5} = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { Op } = require("sequelize")



const router = express.Router() 

let filterRecipes = []; 

router.get("/", async (req, res, next) => { 
    const {name} = req.query
 var localRecipe; 

    try {
        if(name){
            var recipes = await Recipe.findAll({ 
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                    
                },
                include: Diet
               
            })

            localRecipe = recipes.map(recipe => {
                return {
                    id: recipe.id, 
                    name: recipe.name,
                    summary: recipe.summary,
                    score: recipe.score,
                    healthScore: recipe.healthScore,
                    image: recipe.image,
                    steps: recipe.steps,
                    diets: recipe.Diets.map(diet => {
                        return [diet.name]
                    })
                }
            })
          
        }else{
          var recipes = await Recipe.findAll({ 
               include: Diet
           }) 
           localRecipe = recipes.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.name,
                summary: recipe.summary,
                score: recipe.score,
                healthScore: recipe.healthScore,
                image: recipe.image,
                steps: recipe.steps,
                diets: recipe.Diets.map(diet => {
                    return [diet.name]
                })
            }
        })
    } 
    
       let apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&addRecipeInformation=true&number=100`)
       let apiChangePropertys = apiRecipe.data.results.map(recipe => {
           return {
               id: recipe.id,
               name: recipe.title,
               summary: recipe.summary,
               score: recipe.spoonacularScore,
               healthScore: recipe.healthScore,
               image: recipe.image,
               steps: recipe.steps,
               diets: recipe.diets
           }
       })
       let apiFiltered = [];
    //    console.log(apiRecipe, "linea 68")
       if(name){
           apiFiltered = apiChangePropertys.filter(recipe => {
               return recipe.name.toLowerCase().includes(name.toLowerCase())
           })
       }else{
           apiFiltered = apiChangePropertys
        //    conosole.log(apiFiltered, "linea 75")
       }
    
       filterRecipes = localRecipe.concat(apiFiltered);
       return res.json(filterRecipes)

    }
    catch(error){
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const {id} = req.params
    console.log(id, 'el id q llega desde el front')
    if(!id) {
        return next({msg: "no me mandaste el id", status: 500})
    }
    var recipe;
    try{
        if(typeof id === "string" && id.length >= 10){
           var recipeDB = await Recipe.findByPk(id, {
                include: Diet
            })
            recipe = {
                name: recipeDB.name,
                summary: recipeDB.summary,
                score: recipeDB.score,
                healthScore: recipeDB.healthScore,
                image: recipeDB.image,
                steps: recipeDB.steps, 
                diets: recipeDB.Diets.map(diet => {
                    return [diet.name] 
                })
            }
            // console.log(recipe.summary)
        }else{
            var recipeResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${DB_APIKEY}`)
            // console.log(recipeResponse, "linea 110")
            recipe = {
                name: recipeResponse.data.title,
                summary: recipeResponse.data.summary,
                score: recipeResponse.data.spoonacularScore,
                healthScore: recipeResponse.data.healthScore,
                image: recipeResponse.data.image,
                steps: recipeResponse.data.instructions,
                diets: recipeResponse.data.diets 
            }
            console.log(recipe.summary, "linea 120")
        // console.log(recipe, "linea 121")
        }
        // console.log(recipe, "linea 123")
        return res.json(recipe)
    }
    catch(error){
        next(error)
    }
})




module.exports = router;