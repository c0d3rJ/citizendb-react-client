import React from "react";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, Pagination, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function PaginationComponent({handlePageSizeChange, handlePageChange, pageSize, page, count}){
	return(
		<Box sx={{display: 'flex',  flexDirection: 'row', p: 1, m: 1, borderRadius: 1, width:'inherit'}}>
			<FormControl sx={{minWidth: 150, alignContent:'center', pr:2}}>
				<InputLabel id="page-size-select-label">{'Items per Page'}</InputLabel>
				<Select
					id="page-size-select"
					label="Items per Page"
					autoWidth
					onChange={handlePageSizeChange}
					InputLabelProps={{
						shrink: true,
					}}
					value={pageSize}
				>
					<MenuItem value={5}>Five</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
					{/*pageSizes.map((size) => (
							<MenuItem key={size.id} value={size.value}>
								{size.value}
							</MenuItem>
						))*/}

				</Select>
			</FormControl>
			<Pagination
				sx={{ pt:2}}
				count={count}
				page={page}
				siblingCount={1}
				boundaryCount={1}
				//variant="outlined"
				shape="rounded"
				onChange={handlePageChange}
				//size="large"
			/>

		</Box>
	)
}

export default PaginationComponent