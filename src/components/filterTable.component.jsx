import React from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function FilterTableComponent({
																onChangeSearchSurname,
																onChangeSearchName,
																onChangeSearchDob,
																filterByNamesAndDoB,
																//searchSurname,
																//searchName,
																//searchDob
}){


  return(
		<Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 1, borderRadius: 1,}}>
			{/*Surname*/}
			<TextField
				variant="outlined"
				sx={{ m: 1, width: '25ch' }}
				label="Search by Surname"
				//value={searchSurname}
				//defaultValue={""}
				//onFocus={onChangeSearchSurname}
				onChange={onChangeSearchSurname}
			/>
			{/*Name*/}
			<TextField
				variant="outlined"
				sx={{ m: 1, width: '25ch' }}
				label="Search by Name"
				//value={searchName}
				onChange={onChangeSearchName}
			/>
			{/*Dob*/}
			<TextField
				variant="outlined"
				sx={{ m: 1, width: '25ch' }}
				type="date"
				className="form-control"
				label="Filter by Date of Birth"
				InputLabelProps={{
					shrink: true,
				}}
				//value={searchDob}
				onChange={onChangeSearchDob}
			/>
			<Button
				variant="outlined"
				sx={{ m: 1, width: '15ch' }}
				className="btn btn-outline-secondary"
				type="button"
				onClick={filterByNamesAndDoB}
			>
				Search
			</Button>
		</Box>
	)
}

export default FilterTableComponent;