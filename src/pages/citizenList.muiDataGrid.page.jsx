import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import CitizenService from "../services/citizen.service";
import FilterTableComponent from "../components/filterTable.component";
import {
	FormControl,
	InputLabel,
	LinearProgress,
	Pagination,
	Paper,
	Select
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CitizenViewComponent from "../components/citizenView.component";
import PaginationComponent from "../components/pagination.component";


const CitizenListMDG = (props) => {
	//Table Data
	const [data, setData] = useState([]);
	//For Search Filter
	const [searchName, setSearchName] = useState("");
	const [searchSurname, setSearchSurname] = useState("");
	const [searchDob, setSearchDob] = useState("");
	//For Pagination
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [isloading, setIsloading] = useState(false)
	//For Modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {setOpen(false); setCitizenViewData([])}
	const [citizenViewData, setCitizenViewData] = useState([])

	const pageSizes = [{ id: 1, value: 5},{ id: 2, value: 10},{ id: 3, value: 20}, ];

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
				setData(content)
				setCount(totalPages);
				setPageSize(pageSize);
				setIsloading(false)
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveCitizen = (id) => {
		console.debug(id)
		CitizenService.getById(id)
			.then((response) => {
				setCitizenViewData(response.data)
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

	const openRow = (event) => {
		retrieveCitizen(event.target.value);
		handleOpen();
	}

	useEffect(retrieveCitizens,[page,pageSize]);

	const onChangeSearchName = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};
	const onChangeSearchSurname = (e) => {
		const searchSurname = e.target.value;
		setSearchSurname(searchSurname);
	};
	const onChangeSearchDob = (e) => {
		const searchDob = e.target.value;
		setSearchDob(searchDob);
	};

	const filterByNamesAndDoB = () => {
		setPage(1);
		retrieveCitizens();
	};

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
			minWidth: 65,
			maxWidth: 120,
			flex: 1,
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

			renderCell: (param) =>{
				const rowId = param.row.id
				//console.log(rowId)
				return (
				<strong>
					<Button
						value={rowId}
						variant="contained"
						color="primary"
						size="small"
						style={{ }}
						onClick={openRow}
						//onClick={handleOpen}
					>
						View
					</Button>
				</strong>
			)},
			//minWidth: 80,
			width: 90,
			//flex: 1,
		},
	]

	//PaginationComponent({handlePageSizeChange, handlePageChange, pageSize, page, count})
	//CitizenViewComponent({citizenViewData, handleClose, open})

	const CustomPagination = () =>{
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

	return (
		<Box sx={{justifyContent:'center', pb:30, px:15}} >
			<h1>MUI Data-Grid</h1>

			<CitizenViewComponent citizenViewData={citizenViewData} handleClose={handleClose} open={open}/>

			<Paper elevation={5} style={{ height: "120", minWidth:'1210'}} sx={{ display: 'flex', flexWrap: 'wrap', mb:3 }}>
				<FilterTableComponent
					onChangeSearchSurname={onChangeSearchSurname}
					onChangeSearchName={onChangeSearchName}
					onChangeSearchDob={onChangeSearchDob}
					filterByNamesAndDoB={filterByNamesAndDoB}
				/>
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
					rows={data}
					columns={columns}
					pageSize={pageSize}
					rowsPerPageOptions={pageSizes}
					autoHeight
					checkboxSelection
					disableSelectionOnClick
					components={{
						LoadingOverlay: LinearProgress, //for linear loading bar
						//Pagination: PaginationComponent //Custom pagination
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