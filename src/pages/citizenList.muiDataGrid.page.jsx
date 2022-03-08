import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import CitizenService from "../services/citizen.service";
import {FormControl, Grid, InputLabel, LinearProgress, Pagination, Paper, Select, TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

const CitizenListMDG = (props) => {
	const [rows, setRows] = useState([]);

	const [searchName, setSearchName] = useState("");
	const [searchSurname, setSearchSurname] = useState("");
	const [searchDob, setSearchDob] = useState("")

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [isloading, setIsloading] = useState(false)

	const pageSizes = [5, 10, 20];

	const getRequestParams = (searchSurname, searchName, searchDob, page, pageSize) => {
		let params = {};

		if (searchSurname) {
			params["surname"] = searchSurname;
		}
		if (searchName) {
			params["name"] = searchName;
		}
		if (searchDob) {
			params["dob"] = searchDob;
		}
		if (page) {
			params["page"] = page - 1;
		}
		if (pageSize) {
			params["size"] = pageSize;
		}

		return params;
	};

	const retrieveCitizens = () => {
		const params = getRequestParams(searchSurname, searchName, searchDob, page, pageSize);
		setIsloading(true)
		CitizenService.filterByNamesAndDoB(params)
			.then((response) => {
				const {content, totalPages} = response.data;
				const rows1 = content
				setRows(rows1)
				setCount(totalPages);
				setPageSize(pageSize);
				setIsloading(false)
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handlePageSizeChange = (event) => {
		//setPageSize(value);
		setPageSize(event.target.value);
		setPage(1);
	};

	useEffect(retrieveCitizens, [page, pageSize]);

	const columns = [
		{field: 'id', headerName: 'id', minWidth: 70, hide: true},
		{
			field: "surname",
			headerName: "Surname",
			minWidth: 150,
		  flex: 1,
		},
		{
			field: "name",
			headerName: "First Name",
			minWidth: 150,
			flex: 1,
		},
		{
			field: "dob",
			headerName: "Date of Birth",
			minWidth: 110,
			maxWidth: 150,
			type: 'date',
			flex: 1,
		},
		{
			field: "gender",
			headerName: "Gender",
			minWidth: 80,
			maxWidth: 120,
		},
		{
			field: "address",
			headerName: "Address",
			minWidth: 250,
			flex: 1,
		},
		{
			field: "constituency",
			headerName: "Parish",
			minWidth: 150,
			flex: 1,
		},
		{
			field: "rs",
			headerName: "Status",
			minWidth: 60,
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			renderCell: () => (
				<strong>
					<Button
						variant="contained"
						color="primary"
						size="small"
						style={{ }}
					>
						View
					</Button>
				</strong>
			),
			//minWidth: 80,
			width: 90,
			//flex: 1,
		},
	]


	const CustomPaginationGrid = () =>{
		return(
			<Grid container justifyItems={'right'} spacing={'2'} sx={{position: 'relative' }}>
				<Grid item xs={4} style={{padding: '5'}}>
					{"Items per Page: "}
					<select onChange={handlePageSizeChange} value={pageSize}>
						{pageSizes.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</Grid>

				<Grid item xs={8}>
					<Pagination
						sx={{ flexDirection: 'row-reverse' }}
						//className="my-3"
						count={count}
						page={page}
						siblingCount={1}
						boundaryCount={1}
						//variant="outlined"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</Grid>

			</Grid>
		)
	}

	const CustomPagination = () =>{
		return(
			<Box sx={{
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				p: 1,
				m: 1,
				borderRadius: 1,
			}}>
				<Box sx={{flexDirection: 'row', paddingRight:2, alignItems: 'center'}}>
					{"Items per Page: "}
					<select onChange={handlePageSizeChange} value={pageSize} label="Rows">

						{pageSizes.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
					<FormControl sx={{mx:1, minWidth: 150 }}>
						<InputLabel id="demo-simple-select-label">{'Items per Page'}</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							//value={{pageSize}}
							//autoWidth
							label="Items per Page"
							onChange={handlePageSizeChange}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{pageSizes.map((size) => (
								<MenuItem key={size} value={size}>
									{size}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Box sx={{flexDirection: 'row-reverse'}}>
					<Pagination
						sx={{ flexDirection: 'row-reverse' }}
						//className="my-3"
						count={count}
						page={page}
						siblingCount={1}
						boundaryCount={1}
						//variant="outlined"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</Box>

			</Box>
		)
	}

	return (
		<Box sx={{justifyContent:'center', py:5, px:15}} >
			<h1>MUI Data-Grid</h1>
			<Paper elevation={15} style={{ height: "auto", minWidth:'1210'}} sx={{ display: 'flex', flexWrap: 'wrap' }}>
				//TO-DO add search/filter functionality
			</Paper>
			<Paper elevation={15} style={{ height: "auto", minWidth:'1210'}} sx={{ display: 'flex', flexWrap: 'wrap' }}>
				<DataGrid
					sx={{
						m: 2,
						boxShadow: 2,
						border: 2,
						borderColor: 'primary.light',
						'& .MuiDataGrid-cell:hover': {
							color: 'primary.main',
						},
				}}
					rows={rows}
					columns={columns}
					pageSize={pageSize}
					rowsPerPageOptions={pageSizes}
					autoHeight
					checkboxSelection
					disableSelectionOnClick
					components={{
						LoadingOverlay: LinearProgress, //for linear loading bar
						Pagination: CustomPagination //Custom pagination
					}}
					loading={isloading}

					pagination
					paginationMode={"server"}
					rowCount={count}
					page={page}
					onPageChange={(page) => setPage(page)}
					onPageSizeChange={(pageSize)=>{setPageSize(pageSize); setPage(1)}}
				/>
				{/*<TablePagination
					component="div"
					count={count}
					page={page}
					onPageChange={handlePageChange}
					rowsPerPage={pageSize}
					onRowsPerPageChange={handlePageSizeChange}
				/>*/}
			</Paper>

		</Box>
	);
};

export default CitizenListMDG;