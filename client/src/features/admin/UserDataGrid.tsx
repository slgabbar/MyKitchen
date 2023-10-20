import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: false,
    },
    {
        field: 'emailConfirmed',
        headerName: 'Email Confirmed',
        width: 150,
        editable: false,
    },
];

export default function UserDataGrid() {
    const [rowData, setRowData] = useState<{}[]>([]);

    useEffect(() => {
        agent.Admin.GetUserLoginDataDataAsync()
            .then(function (result) {
                let dataObjArray: {}[] = [];
                result.forEach((d: any) => {
                    dataObjArray.push({
                        id : d.userId,
                        firstName: d.firstName,
                        lastName: d.lastName,
                        email: d.email,
                        emailConfirmed: d.emailConfirmed
                    });
                });
                setRowData(dataObjArray);
            })
    }, []);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
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
        </Box>
    );
}

