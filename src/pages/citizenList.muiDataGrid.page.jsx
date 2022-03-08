import React, {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import CitizenService from "../services/citizen.service";
import {Paper, TablePagination} from "@mui/material";
import Button from "@mui/material/Button";

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
		{field: 'id', headerName: 'id', width: 90},
		{
			field: "surname",
			headerName: "Surname",
			width: 150,
		},
		{
			field: "name",
			headerName: "First Name",
			width: 150,
		},
		{
			field: "dob",
			headerName: "Date of Birth",
			width: 110,
			type: 'date',
		},
		{
			field: "gender",
			headerName: "Gender",
			width: 80,
		},
		{
			field: "address",
			headerName: "Address",
			width: 250,
		},
		{
			field: "constituency",
			headerName: "Parish",
			width: 150,
		},
		{
			field: "rs",
			headerName: "Status",
			width: 60,
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
		},
	]


	return (
		<div className="col-md-8">
			<h1>MUI Data-Grid</h1>
			<Paper elevation={15} style={{ height: "auto", width: '90%'}}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={pageSize}
					rowsPerPageOptions={pageSizes}
					loading={isloading}
					autoHeight
					checkboxSelection
					disableSelectionOnClick
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

		</div>
	);
};

export default CitizenListMDG;