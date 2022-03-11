import React, {useEffect, useMemo, useRef, useState} from "react";
import CitizenService from "../services/citizen.service";
import {Link} from "react-router-dom";
import {useTable} from "react-table";
import {Pagination} from "@mui/material";
import CitizenViewComponent from "../components/citizenView.component";
import Button from "@mui/material/Button";

const CitizenListRT = (props) => {
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
	//For Modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {setOpen(false); setCitizenViewData([])}
	const [citizenViewData, setCitizenViewData] = useState([])

	const pageSizes = [5, 10, 20];

	const dataRef = useRef();
	dataRef.current = data;

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

		CitizenService.filterByNamesAndDoB(params)
			.then((response) => {
				const {content, totalPages} = response.data;
				setData(content);
				setCount(totalPages);
				setPageSize(pageSize);
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
		setPageSize(event.target.value);
		setPage(1);
	};

	const openRow = (rowIndex) => {
		const id = dataRef.current[rowIndex].id;
		retrieveCitizen(id);
		handleOpen();
		//props.history.push(`/getById/${id}`);
	};

	useEffect(retrieveCitizens, [page, pageSize]);

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

	const filterSearch = () => {
		setPage(1);
		retrieveCitizens();
	};

	const columns = useMemo(
		() => [
			{
				Header: "Surname",
				accessor: "surname",
			},
			{
				Header: "First Name",
				accessor: "name",
			},
			{
				Header: "Date of Birth",
				accessor: "dob",
			},
			{
				Header: "Gender",
				accessor: "gender",
			},
			{
				Header: "Address",
				accessor: "address",
			},
			{
				Header: "Parish",
				accessor: "constituency",
			},
			{
				Header: "Status",
				accessor: "rs",
				//Cell: (props) => {
				//	return props.value ? "Citizen" : "Non-National";
				//},
			},
			{
				Header: "Actions",
				accessor: "actions",
				Cell: (props) => {
					const rowIdx = props.row.id;
					return (
						<div>
							<span>
								<Link to={"/viewCitizens/"+rowIdx} className="btn btn-sm btn-warning action mr-2">
								View
								</Link>
								<Button
									className="btn btn-sm btn-warning action mr-2"
									value={rowIdx}
									//variant="contained"
									//color="primary"
									//size="small"
									//style={{ }}
									onClick={openRow}
									//onClick={handleOpen}
								>
									View
								</Button>
              </span>
						</div>
					);
				},
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data: data,
	});

	return (
		<div className="list row">
			<h1>React-Table</h1>
			<CitizenViewComponent citizenViewData={citizenViewData} handleClose={handleClose} open={open}/>
			<div className="col-md-8">
				<div className="input-group mb-3">

					{/*Surname*/}
					<input
						type="text"
						className="form-control"
						placeholder="Search by Surname"
						value={searchSurname}
						onChange={onChangeSearchSurname}
					/>

					{/*Name*/}
					<input
						type="text"
						className="form-control"
						placeholder="Search by Name"
						value={searchName}
						onChange={onChangeSearchName}
					/>

					{/*Dob*/}
					<input
						type="date"
						className="form-control"
						placeholder="Search by Date of Birth"
						value={searchDob}
						onChange={onChangeSearchDob}
					/>

					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={filterSearch}
						>
							Search
						</button>
					</div>

				</div>
			</div>

			<div className="col-md-12 list">
				<div className="mt-3">
					{"Items per Page: "}
					<select onChange={handlePageSizeChange} value={pageSize}>
						{pageSizes.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>

					<Pagination
						className="my-3"
						count={count}
						page={page}
						siblingCount={1}
						boundaryCount={1}
						variant="outlined"
						shape="rounded"
						onChange={handlePageChange}
					/>
				</div>

				<table
					className="table table-striped table-bordered"
					{...getTableProps()}
				>
					<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}

					</thead>
					<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CitizenListRT;