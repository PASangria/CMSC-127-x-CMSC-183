import React from "react";
import { Pagination, Box } from "@mui/material";

const PaginationButtons = ({ count, page, onChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant="filled"
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "18px",
            borderColor: "rgba(207, 197, 197, 0)", // maroon border with low opacity
            color: "rgba(114, 108, 108, 0.81)",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "rgb(123, 17, 19)",
            color: "rgb(243, 243, 243)",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(123, 17, 19, 0.08)",
          },
        }}
      />
    </Box>
  );
};

export default PaginationButtons;
