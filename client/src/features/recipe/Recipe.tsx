import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";

interface RecipeDto {
    recipeKey: string;
    title: string;
    description: string;
}

function Recipe() {

    const [recipe, setRecipe] = useState<RecipeDto |null>(null);
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        agent.Recipe.GetRecipe(id!)
            .then(function (result) {
                setRecipe(result);
            })
    }, [id]);

    return (
        <>
            <p>{recipe?.title}</p>
            <p>{recipe?.description}</p>
        </>
  );
}

export default Recipe; 