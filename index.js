import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   
    res.render("index.ejs")
});

app.get("/search", async (req, res) => {
  let searchName = req.query["search"];
  console.log(searchName);
  
  const API_url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchName}`;
    try {
      const result = await axios.get(API_url);
       const searchContent = result.data;
      res.render("index.ejs", { searchContent: searchContent.drinks[0] });
      console.log(searchContent);
      
    } catch (error) {
    console.error("API call failed:", error.message);
    res.render("index.ejs", { searchContent: null });
  }
  
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
});