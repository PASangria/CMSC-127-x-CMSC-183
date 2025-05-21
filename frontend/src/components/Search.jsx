export default function Search({ value, onChange }) {
    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
        <OutlinedInput
            size="small"
            id="search"
            placeholder="Search…"
            sx={{ flexGrow: 1 }}
            value={value}
            onChange={onChange}
            startAdornment={
            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
            }
            inputProps={{
            'aria-label': 'search',
            }}
        />
        </FormControl>
    );
}
