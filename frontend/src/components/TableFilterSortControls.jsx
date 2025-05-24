import React, { useState } from 'react';
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Typography,
    TextField,
    Stack,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function TableFilterSortControls({
    selectedFilters,
    onFilterChange,
    sortField,
    sortDirection,
    onSortChange,
    filterOptions = [],
}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterByAnchorEl, setFilterByAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const filterByOpen = Boolean(filterByAnchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setFilterByAnchorEl(null);
    };
    const handleFilterByOpen = (event) => {
        setFilterByAnchorEl(event.currentTarget);
    };

    const handleAutocompleteChange = (category, newValues) => {
        onFilterChange({
        ...selectedFilters,
        [category]: newValues,
        });
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1} mb={2}>
        <IconButton onClick={handleMenuOpen} sx={{ border: '1px solid #000', color: '#000' }}>
            <FilterListIcon />
        </IconButton>

        {/* Main Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem
            onClick={() => {
                onSortChange(sortField, 'asc');
                handleMenuClose();
            }}
            >
            <ListItemIcon>
                <ArrowUpwardIcon fontSize="small" />
            </ListItemIcon>
            Sort by ASC
            </MenuItem>
            <MenuItem
            onClick={() => {
                onSortChange(sortField, 'desc');
                handleMenuClose();
            }}
            >
            <ListItemIcon>
                <ArrowDownwardIcon fontSize="small" />
            </ListItemIcon>
            Sort by DESC
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleFilterByOpen}>
            <ListItemIcon>
                <FilterAltOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Filter by
            </MenuItem>
        </Menu>

        {/* Filter Submenu with Autocomplete fields */}
        <Menu
            id="filter-by-menu"
            anchorEl={filterByAnchorEl}
            open={filterByOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            disableScrollLock
            >
            <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                padding: 2,
                minWidth: 600,
                maxWidth: 800,
                }}
            >
                {/* ❌ Close Button */}
                <IconButton onClick={handleMenuClose}>
                <CloseIcon />
                </IconButton>

                {/* Filter Options - Horizontal */}
                {filterOptions.map((option) => (
                <Autocomplete
                    key={option.value}
                    multiple
                    options={option.choices}
                    size="small"
                    disableCloseOnSelect
                    ChipProps={{ size: 'small' }}
                    value={selectedFilters[option.value] || []}
                    onChange={(_, newVal) => handleAutocompleteChange(option.value, newVal)}
                    sx={{
                    minWidth: 200,
                    flexGrow: 1,
                    '& .MuiInputBase-root': {
                        height: 40, // same fixed height
                        paddingTop: '2px',
                        paddingBottom: '2px',
                    },
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label={option.label}
                        placeholder="Select..."
                        size="small"
                        sx={{
                        '& .MuiInputBase-root': {
                            height: 40,
                            paddingTop: '2px',
                            paddingBottom: '2px',
                        },
                        }}
                    />
                    )}
                />
                ))}


                {/* ✅ Apply Filters Button */}
                <IconButton
                onClick={handleMenuClose} // or a separate apply handler
                color="primary"
                sx={{ marginLeft: 'auto' }}
                >
                <CheckIcon />
                </IconButton>
            </Box>
        </Menu>


        </Box>
    );
}
