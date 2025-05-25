import React, { useState } from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    Stack,
    IconButton,
    Popover,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Button from './UIButton';

const StudentFilterBar = ({
    filterText,
    setFilterText,
    years,
    setYears,
    yearOptions,
    programs,
    setPrograms,
    programOptions,
    selectedDate,
    setSelectedDate,
    onReset
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2, flexWrap: 'wrap' }}
        >
            {/* Search */}
            <TextField
                variant="outlined"
                placeholder="Search by name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#000000', fontSize: 20 }} />
                        </InputAdornment>
                    ),
                    sx: {
                        height: 48, // make input taller
                        paddingY: 0,
                        fontSize: '1rem',
                        alignItems: 'center',
                    },
                }}
                sx={{
                    flex: '1 1 auto',
                    minWidth: { xs: '100%', sm: '250px' },
                    maxWidth: '500px',
                    '& .MuiOutlinedInput-root': {
                        height: 40,
                        borderRadius: '4px',
                        fontSize: '1rem',
                        paddingY: 0,
                    },
                    '& input': {
                        padding: '12px 8px', // vertically centers the text
                        fontSize: '1rem',
                        marginTop: '15px',
                    },
                    '& input::placeholder': {
                        fontSize: '1rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        opacity: 1,
                    },
                }}
            />

        {/* Filter Icon Button */}
        <IconButton
            onClick={handleFilterClick}
            aria-label="Open filter options"
            sx={{
                background: 'none !important',
                padding: 1,
                '&:hover, &.Mui-focusVisible, &:active': {
                background: 'none !important',
                }
            }}
        >
            <FilterListAltIcon sx={{ color: '#7B1113' }} />
        </IconButton>

        {/* Popover containing the filter fields */}
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                maxWidth: '100vw',
                overflowX: 'auto',
                px: 2,
                },
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                p: 2,
                minWidth: 700,
                flexWrap: 'nowrap', // Prevent wrapping
                }}
            >
                {/* Year Level */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="year-level-label" sx={{ top: '-6px' }}>
                    Year Level
                </InputLabel>
                <Select
                    labelId="year-level-label"
                    label="Year Level"
                    multiple
                    value={years}
                    onChange={(e) =>
                    setYears(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                    }
                    renderValue={(selected) => selected.join(', ')}
                    sx={{
                    height: 40,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '2px',
                    },
                    }}
                >
                    {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                        <Checkbox checked={years.includes(year)} />
                        <ListItemText primary={year} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>

                {/* Degree Program */}
                <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel id="program-label" sx={{ top: '-6px' }}>
                    Degree Program
                </InputLabel>
                <Select
                    labelId="program-label"
                    label="Degree Program"
                    multiple
                    value={programs}
                    onChange={(e) =>
                    setPrograms(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
                    }
                    renderValue={(selected) => selected.join(', ')}
                    sx={{
                    height: 40,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '2px',
                    },
                    }}
                >
                    {programOptions.map((prog) => (
                    <MenuItem key={prog} value={prog}>
                        <Checkbox checked={programs.includes(prog)} />
                        <ListItemText primary={prog} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>

                {/* Date Submitted */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date Submitted"
                    value={selectedDate ? new Date(selectedDate) : null}
                    onChange={(newValue) => {
                    if (newValue) {
                        const formattedDate = newValue.toISOString().split('T')[0];
                        setSelectedDate(formattedDate);
                    } else {
                        setSelectedDate('');
                    }
                    }}
                    slotProps={{
                    textField: {
                        size: 'small',
                        sx: {
                        minWidth: 160,
                        '& .MuiInputBase-root': { height: 40 },
                        '& .MuiInputLabel-root': { top: '-6px' },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                        },
                        },
                    },
                    }}
                />
                </LocalizationProvider>

                {/* Reset Button */}
                <Button
                    variant="outlined"
                    onClick={() => {
                        onReset();
                        handleFilterClose();
                    }}
                    sx={{ height: 36, minWidth: 80 }}
                    aria-label="Reset filters"
                    >
                    Reset
                </Button>
            </Stack>
            </Popover>

        </Stack>
    );
};

export default StudentFilterBar;
