//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require("axios");
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');
require("dotenv").config()
const {DB_APIKEY, DB_APIKEY2, DB_APIKEY3, DB_APIKEY4, DB_APIKEY5} = process.env;



// Syncing all the models at once.
conn.sync({ force: true }).then((next) => {
  console.log("base de datos conectada")  
   axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${DB_APIKEY}&addRecipeInformation=true&number=200`)
   .then(resultado => {
   var results = resultado.data.results
   var resultsDiets = results.map(e => { 
     return e.diets
   })

   var resultadosRepetidos = resultsDiets.flat()
  var diets = resultadosRepetidos.filter((item, index) => {
    return resultadosRepetidos.indexOf(item) === index;
  })
    diets.unshift("vegetarian")
    diets = diets.map(diet => {      // ["vegan", "vegetarian" "..."] [{name: "vegan"}, {name: "vegetarian"}]
      return {name: diet}
    })
    diets.forEach(diet => Diet.create(diet))
  })
  .catch(err => console.error(err))
  console.log("dietas precargadas") 
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console 
  });
});

// conn.sync({ force: true }).then(() => {

//   // ---------- PRECARGAMOS LOS TIPOS DE DIETAS DISPONIBLES -----------------
//   var GlutenFree = Diet.create({
//     name: 'Gluten Free', 
//     description: 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).'
//   })
  
//   var Ketogenic = Diet.create({
//     name: 'Ketogenic', 
//     description: 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.'
//   })
  
//   var Vegetarian = Diet.create({
//     name: 'Guten Free', 
//     description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin.'
//   })
  
//   var LactoVegetarian = Diet.create({
//     name: 'Lacto-Vegetarian', 
//     description: 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.'
//   })
  
//   var OvoVegetarian = Diet.create({
//     name: 'Ovo-Vegetarian', 
//     description: 'All ingredients must be vegetarian and none of the ingredients can be or contain dairy.'
//   })
  
//   var Vegan = Diet.create({
//     name: 'Vegan', 
//     description: 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.'
//   })
  
//   var Pescetarian = Diet.create({
//     name: 'Pescetarian', 
//     description: 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.'
//   })
  
//   var Paleo = Diet.create({
//     name: 'Paleo', 
//     description: 'Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.'
//   })

//   var Primal = Diet.create({
//     name: 'Primal', 
//     description: 'Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.'
//   }) 

//   var Whole30 = Diet.create({
//     name: 'Whole 30', 
//     description: 'Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.'
//   })
  
//   Promise.all([GlutenFree, Ketogenic, Vegetarian, LactoVegetarian, OvoVegetarian, 
//     Vegan, Pescetarian, Paleo, Primal, Whole30])
//     .then(res => {
//       console.log("dietas precargadas");
//     })
//     .catch(err => {
//       next(err);
//     })
   
// });

//   server.listen(3001, () => {
//     console.log(`listening at 3001`); // eslint-disable-line no-console
//   });
