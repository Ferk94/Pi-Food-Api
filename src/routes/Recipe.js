const express = require("express")
const { Recipe, Diet } = require("../db");
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

// router.use(express.json())


router.post("/", (req, res, next) => { 
    const {name, summary, score, healthScore, image, steps, diets} = req.body;
    Recipe.create({
        id: uuidv4(),
        name,
        summary, 
        score,
        healthScore,
        image, 
        steps
    })
    .then(createdRecipe => {
        return createdRecipe.addDiet(diets)
    })
    .then(recipeWithDiets => {
        res.json(recipeWithDiets) 
    })
    .catch((err) => next(err))
})

// router.post("/:recipeId/diets/:dietId", async (req, res, next) => {
//     try{
//         const {recipeId, dietId} = req.params
//         var receta = await Recipe.findByPk(dietId)
//         var dieta = await Diet.findByPk(recipeId)
//         var recetaConDieta = await receta.addDiets(dieta)
//         res.json(recetaConDieta)

//     }catch(error){
//         next(error)     
//     }
// })

module.exports = router;