const express = require("express")
const { Diet } = require("../db");

const router = express.Router()

router.get("/", (req, res, next) => {
    try{
        Diet.findAll()
        .then(diets => {
            res.json(diets)
        })

    }catch(error){
        next(error)
    }
})

// router.post("/", (req, res, next) => {
//     try{
//         const {name} = req.body
//         Diet.create({
//             name
//         })
//         .then((dietaCreada) => {
//             res.json(dietaCreada)
//         })

//     }catch(error){
//         next(error)
//     }
// })



module.exports = router