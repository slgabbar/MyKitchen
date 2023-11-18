import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import MainLayout from "../../app/layout/MainLayout";

interface RecipeDto {
    recipeKey: string;
    title: string;
    description: string;
}

function Recipe() {

    const [recipe, setRecipe] = useState<RecipeDto |null>(null);
    const { id } = useParams();

    useEffect(() => {
        agent.Recipe.GetRecipe(id!)
            .then(function (result) {
                setRecipe(result);
            })
    }, [id]);

    return (
        <MainLayout>
            <p>{recipe?.title}</p>
            <p>{recipe?.description}</p>
        </MainLayout>
  );
}

export default Recipe; 