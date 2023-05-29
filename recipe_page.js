const appID = "b36ca911";
const appKey = "3fe7c7af105a171c3f73908dff4075ad";
const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appID}&app_key=${appKey}`;

const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#email");




txtSearch.addEventListener("keyup", (e)=>{
    const inputVal = txtSearch.value;
    if(e.keyCode===13){
    loadRecipies(type = `${inputVal}`);
    }
})


function loadRecipies(type ="chicken"){
    recipeContainer.innerHTML = " ";
    const url = baseURL + `&q=${type}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipies(data.hits))
    
  .catch((error) => console.log(error));  

}

loadRecipies();

const getRecipeStepsStr =(ingredientLines = [])=>{
    let str = "";
    for(var step of ingredientLines){
        str= str+ `<li>${step}</li>`
    }
    return str;
}


const renderRecipies= (recipeList =[])=>{
recipeList.forEach((recipeObj) =>{
      const { 
        label : recipeTitle,
         ingredientLines, 
        image: recipeImage
    }= recipeObj.recipe;
    const recipeStepStr = getRecipeStepsStr(ingredientLines);
   const htmlStr = `<div class="recipe">
   <div class=""recipe-title">${recipeTitle}</div>
   <div class="recipe-image">

       <img src="${recipeImage}" alt="" />
       </div>

       <div class="recipe-text">

       <ul>
       ${recipeStepStr}
       </ul>

       </div>
       </div>
   `;
   recipeContainer.insertAdjacentHTML("beforeend",  htmlStr);     

});
};

