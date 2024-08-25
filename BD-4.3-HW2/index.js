let express = require("express");
let app = express();
let port = 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./BD-4.3-HW2/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();
// Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW3 Filter by parameter" });
});
// node BD-4.3-HW2/initDB.js
// THE ENPOINTS
// node BD-4.3-HW2
// recipes/cuisine/Italian
async function filterByCuisine(cuisine) {
  let query = "SELECT * FROM recipes WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { recipes: response };
}
app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let results = await filterByCuisine(cuisine);
    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: `No recipes found for cuisine: ${cuisine}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//2 /recipes/main_ingredient/Chicken
async function filterByMainIngredient(main_ingredient) {
  let query = "SELECT * FROM recipes WHERE main_ingredient = ?";
  let response = await db.all(query, [main_ingredient]);
  return { recipes: response };
}
app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  let main_ingredient = req.params.main_ingredient;
  try {
    let results = await filterByMainIngredient(main_ingredient);
    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: `No recipes found for main ingredient: ${main_ingredient}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//3 /recipes/preparation_time/30
async function filterByPreparationTime(preparation_time) {
  let query = "SELECT * FROM recipes WHERE preparation_time = ?";
  let response = await db.all(query, [preparation_time]);
  return { recipes: response };
}
app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  let preparation_time = req.params.preparation_time;
  try {
    let results = await filterByPreparationTime(preparation_time);
    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: `No recipes found for preparation time: ${preparation_time}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//4 /recipes/difficulty/Easy
async function filterByDifficulty(difficulty) {
  let query = "SELECT * FROM recipes WHERE difficulty = ?";
  let response = await db.all(query, [difficulty]);
  return { recipes: response };
}
app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  let difficulty = req.params.difficulty;
  try {
    let results = await filterByDifficulty(difficulty);
    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: `No recipes found for difficulty: ${difficulty}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//5 /recipes/vegetarian/true
async function filterByVegetarian(vegetarian) {
  let query = "SELECT * FROM recipes WHERE vegetarian = ?";
  let response = await db.all(query, [vegetarian]);
  return { recipes: response };
}
app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  let vegetarian = req.params.vegetarian;
  try {
    let results = await filterByVegetarian(vegetarian);
    if (results.recipes.length === 0) {
      return res.status(404).json({
        message: `No recipes found for vegetarian: ${vegetarian}`,
      });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
