const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoute = require("./Recipe");
const recipesRoute = require("./Recipes");
const dietRoute = require("./Diet")


const router = Router();

router.get("/", (req, res) => {
    res.send("estoy en home")
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", recipeRoute)
router.use("/recipes", recipesRoute)
router.use("/diets", dietRoute)


module.exports = router;
