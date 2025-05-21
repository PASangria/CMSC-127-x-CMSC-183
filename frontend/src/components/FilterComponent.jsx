import React, { useState } from 'react';
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FilterComponent = ({ onFilter }) => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(null);

    const handleApply = () => {
        onFilter({
        search,
        category,
        date: date ? date.format('YYYY-MM-DD') : null,
        });
    };

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setDate(null);
        onFilter({});
    };

    return (
        <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="Books">Books</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Date"
            value={date}
            onChange={setDate}
            slotProps={{ textField: { fullWidth: false } }}
            />
        </LocalizationProvider>

        <Button variant="contained" onClick={handleApply}>Apply</Button>
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        </Box>
    );
};

export default FilterComponent;