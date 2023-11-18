import { Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import CreateRecipe from './CreateRecipe';


const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: false,
        renderCell: (params) =>
            <Link to={`/recipe/${params.row.id}`}>{params.row.title}</Link>
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150,
        editable: false,
    },
];

export default function MyRecipes() {

    const [rowData, setRowData] = useState<{}[]>([]);

    useEffect(() => {
        agent.Recipe.GetUserRecipes()
            .then(function (result) {
                let dataObjArray: {}[] = [];
                result.forEach((d: any) => {
                    dataObjArray.push({
                        id: d.recipeKey,
                        title: d.title,
                        description: d.description,
                    });
                });
                setRowData(dataObjArray);
            })
    }, []);

    return (
        <>
            <Typography variant="h3">My Recipes</Typography>
            <CreateRecipe></CreateRecipe>
            <Paper elevation={1}>
                <DataGrid
                    rows={rowData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Paper>
        </>
    );
}