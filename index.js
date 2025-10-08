const express= require("express")
const { intitializeDatabase } = require("./db/db.connect")

const app=express()

app.use(express.json())


const Recipes=require("./models/recipe.models")

intitializeDatabase()

async function createRecipeData(recipeData){

    try{

    const recipe= new Recipes(recipeData)
    const saveRecipe=await recipe.save()
    return saveRecipe
    }catch(error){
        throw error
    }
}

app.post("/recipes",async (req,res)=>{
    try{
        const newRecipe=await createRecipeData(req.body)
        
            res.status(200).json({message:"Recipe added successfully",recipe:newRecipe})
        

    }catch(error){
        res.status(400).json({error:"An error occured while creating data",details:error.message})
    }
})

async function readAllRecipe(){
    try{
 const allRecipe= await Recipes.find()
 return allRecipe

    }catch(error){
        throw error
    }
}

app.get("/recipes",async (req,res)=>{
    try{

        const recipe=await readAllRecipe()
        if(recipe.length != 0){
            res.status(200).json({message:"The Complete Recipe data is",recipes:recipe})
        }else{
            res.status(400).json({error:"An error in fetching the recipe"})
        }

    }catch(error){
        res.status(400).json({error:"An error occured while fetching data",details:error.message})

    }
})

async function readRecipeByTitle(titleName){
      try{
 const recipe= await Recipes.findOne({title:titleName})
 return recipe

    }catch(error){
        throw error
    }
}

app.get("/recipes/:titleName",async(req,res)=>{
    try{

        const recipe=await readRecipeByTitle(req.params.titleName)

        if(recipe){
            res.status(200).json({message:"Recipe found successfully",recipe:recipe})
        }else{
            res.status(400).json({error:"Recipe not found"})
        }

    }catch (error){

        res.status(500).json({error:"An error occured",details:error.message})

    }
})

async function readRecipeByAuthor(authorName){
      try{
 const recipe= await Recipes.find({author:authorName})
 return recipe

    }catch(error){
        throw error
    }
}

app.get("/recipes/author/:authorName",async(req,res)=>{
    try{

        const recipe=await readRecipeByAuthor(req.params.authorName)

        if(recipe){
            res.status(200).json({message:"Recipe found successfully",recipe:recipe})
        }else{
            res.status(400).json({error:"Recipe not found"})
        }

    }catch (error){

        res.status(500).json({error:"An error occured",details:error.message})

    }
})
    
    
async function readRecipeByDifficulty(level){
      try{
 const recipe= await Recipes.find({difficulty:level})
 return recipe

    }catch(error){
        throw error
    }
}

app.get("/recipes/difficulty/:level",async(req,res)=>{
    try{

        const recipe=await readRecipeByDifficulty(req.params.level)

        if(recipe){
            res.status(200).json({message:"Recipe found successfully",recipe:recipe})
        }else{
            res.status(400).json({error:"Recipe not found"})
        }

    }catch (error){

        res.status(500).json({error:"An error occured",details:error.message})

    }
})

async function updateRecipeById(recipeId,updatedData){
    try{
        const recipe=await Recipes.findByIdAndUpdate(recipeId,updatedData,{new:true})
        return recipe

        

    }catch(error){
        throw error
    }
}

app.post("/recipes/:recipeId",async (req,res)=>{
    try{
        const recipe= await updateRecipeById(req.params.recipeId,req.body)

        if(recipe){
            res.status(200).json({message:"Recipe updated Successfully",recipe:recipe})
        }else{
            res.status(400).json({error:"Recipe not found"})
        }

    }catch(error){
         res.status(500).json({error:"An error occured",details:error.message})
        
    }
})

async function updateRecipeByTitle(titleName,updatedData){
    try{
        const recipe=await Recipes.findOneAndUpdate({title:titleName},updatedData,{new:true})
        return recipe

        

    }catch(error){
        throw error
    }
}

app.post("/recipes/title/:titleName",async (req,res)=>{
    try{
        const recipe=await updateRecipeByTitle(req.params.titleName,req.body)

        if(recipe){
            res.status(200).json({message:"Recipe updated Successfully",recipe:recipe})
        }else{
            res.status(400).json({error:"Recipe not found"})
        }

    }catch(error){
         res.status(500).json({error:"An error occured",details:error.message})
        
    }
})

async function deleteRecipe(recipeId){
    try{
        const recipe=await Recipes.findByIdAndDelete(recipeId)
        return recipe

    }catch(error){
        throw error
    }
}

app.delete("/recipes/:recipeId",async(req,res)=>{
    try{
        const recipe=await deleteRecipe(req.params.recipeId)
        if(recipe){
            res.status(200).json({message:"Recipe Deleted successfully",recipe:recipe})
        }else{
            res.status(400).json({error:"Recipe not founded"})
        }

    }catch(error){
        res.status(500).json({error:"An error occured while deleting the Recipe Data",details:error.message})
    }
})

const PORT=3000

app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`)
})