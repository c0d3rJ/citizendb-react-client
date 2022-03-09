import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import CitizenService from "../services/citizen.service";
import FilterTableComponent from "../components/filterTable.component";
import {
	FormControl,
	InputLabel,
	LinearProgress, Modal,
	Pagination,
	Paper,
	Select, Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";


const CitizenListMDG = (props) => {

	const [data, setData] = useState([]);

	const [searchName, setSearchName] = useState("");
	const [searchSurname, setSearchSurname] = useState("");
	const [searchDob, setSearchDob] = useState("");

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [isloading, setIsloading] = useState(false)

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false)
	const [rowModalId, setRowModalId] = useState('')
	const [citizenView, setCitizenView] = useState([])

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
				//const rows1 = content
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
		//const id = rowModalId
		console.debug(id)
		CitizenService.getById(id)
			.then((response) => {
				setCitizenView(response.data)
				console.debug(response.data)
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
		setRowModalId(event.target.value)
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
		//console.debug(searchSurname);
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

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,}}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Citizen View
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Full Name</TableCell>
									<TableCell align="right">{citizenView.name} {citizenView.surname}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Date of Birth</TableCell>
									<TableCell align="right">{citizenView.dob}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>National Registration Number</TableCell>
									<TableCell align="right">{citizenView.nrn}</TableCell>
								</TableRow>
							</TableBody>
							<TableRow>
								<TableCell>Gender</TableCell>
								<TableCell align="right">{citizenView.gender == 'M' ? 'MALE' : 'FEMALE'}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Address</TableCell>
								<TableCell align="right">{citizenView.address}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Parish</TableCell>
								<TableCell align="right">{citizenView.constituency}</TableCell>
							</TableRow>
						</Table>
					</Typography>
				</Box>
			</Modal>

			<Paper elevation={5} style={{ height: "120", minWidth:'1210'}} sx={{ display: 'flex', flexWrap: 'wrap', mb:3 }}>
				<FilterTableComponent
					onChangeSearchSurname={onChangeSearchSurname}
					onChangeSearchName={onChangeSearchName}
					onChangeSearchDob={onChangeSearchDob}
					filterByNamesAndDoB={filterByNamesAndDoB}
					//searchSurname={searchSurname}
					//searchName={searchName}
					//searchDob={searchDob}
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