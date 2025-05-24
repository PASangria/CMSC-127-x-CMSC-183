import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function GridTable({
    rows,
    columns,
    pageSize = 10,
    pageSizeOptions = [5, 10, 20],
    pagination = true,
    hidePaginationControls = false,
    showAllRows = false, // new flag to show all rows without pagination
}) {
    const finalRows = showAllRows ? rows.slice(0, pageSize) : rows;

    return (
        <DataGrid
            rows={finalRows}
            columns={columns.map(col => ({ ...col, sortable: false }))}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
                pagination: { paginationModel: { pageSize } },
            }}
            pageSizeOptions={pageSizeOptions}
            pagination={pagination}
            hideFooterPagination={hidePaginationControls}
            disableColumnResize
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            density="compact"
            sx={{
                width: '100%',
                '& .even': { backgroundColor: '#f9f9f9' },
                '& .odd': { backgroundColor: '#fff' },
            }}
        />
    );
}
