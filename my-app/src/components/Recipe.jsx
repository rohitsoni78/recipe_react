import { useEffect, useState } from "react";
export default function Recipe()

{

    const [recipename,setRecipeName]=useState("");
    const [ingredients,setIngredients]=useState("");
    const [instructions,setInstructions]=useState("");
    const [recipes,setRecipes]=useState([]);
    const [editingId,setEditingId]=useState(null);

    // Save recipe to localstore
    const saveRecipes=(updatedRecipes)=>{
        localStorage.setItem("recipes",JSON.stringify(updatedRecipes))
        setRecipes(updatedRecipes);
    }
        // Load recipes
        useEffect(()=>{
            const storedRecipes=JSON.parse(localStorage.getItem("recipes"))||[];
            setRecipes(storedRecipes);
        },[])

        // Add recipes
        const handleSubmit=(e)=>{
            e.preventDefault();
            if(!recipename ||!ingredients || !instructions)
            {
                alert("Please fill all fields");
                return;
            }
            if(editingId)
            {
                const updatedRecipes=recipes.map((r)=>
                r.id===editingId?{...r,name:recipename,ingredients,instructions}:r
                )
                saveRecipes(updatedRecipes);
                setEditingId(null);

            }
            else{
                const newRecipe={
                    id:Date.now(),
                    name:recipename,
                    ingredients,
                    instructions
                }
                saveRecipes([...recipes,newRecipe]);
            }
            setRecipeName("");
            setIngredients("");
            setInstructions("");
        }

        // Delete Recipe
        const handleDelete=(id)=>{
            const updateRecipes=recipes.filter((r)=>r.id!==id)
            saveRecipes(updateRecipes)
        }

        // Edit Recipe
        const handleEdit=(r)=>{
            setRecipeName(r.name);
            setIngredients(r.ingredients);
            setInstructions(r.instructions);
            setEditingId(r.id);
        }
    
    return(
        <>
        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px"}}>
            <h1 style={{marginBottom:"20px",border:"1px solid #ccc",padding:"20px"}}>Recipe Book</h1>
            <form onSubmit={handleSubmit}>
            <div style={{marginBottom:"10px"}}>
                <label>Name:</label> <br />
                <input type="text" style={{width:"100%",padding:"5px"}} value={recipename} onChange={(e)=>setRecipeName(e.target.value)}/>
            </div>
            <div style={{marginBottom:"10px"}}>
                <label>Ingredients:</label> <br />
                <input type="text" style={{width:"100%",padding:"5px"}}value={ingredients} onChange={(e)=>setIngredients(e.target.value)}/>
            </div>
            <div style={{marginBottom:"10px"}}>
                <label>Instructions:</label> <br />
                <input type="text" style={{width:"100%",padding:"5px"}}  value={instructions} onChange={(e)=>setInstructions(e.target.value)}/>
            </div>

            <button style={{padding:"5px 10px"}} type="submit">
               {editingId?"Update Recipe":"Add Recipe"}
            </button>

            </form>
        </div>

        <div style={{maxWidth:"600px",margin:"20px auto",border:"1px solid #ccc",padding:"30px"}}>
        <h3>All Recipes</h3>
        {recipes.length===0 && <p>No recipes added yet</p>}
        {recipes.map((r)=>(
            <div key={r.id} style={{border:"1px solid #ccc",padding:"10px",marginBottom:"10px"}}>
                <h4>Recipe Name:{r.name}</h4>
                <p><strong>Ingredients:</strong></p>
                <ul>{r.ingredients}</ul>
                <p><strong>Instruction:{r.ingredients}</strong></p>
                <button style={{padding:"3px 8px",marginRight:"5px"}} onClick={()=>handleEdit(r)}>Edit</button>
                <button style={{padding:"3px 8px"}} onClick={()=>handleDelete(r.id)}>Delete</button>
            </div>
        ))}
        </div>



        </>
    )
}