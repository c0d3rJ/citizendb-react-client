import React, {useState} from "react";

const CitizenListMDG = (props) => {
	const [rows, setRows] = useState([]);

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);


	return (<h1>MUI Data-Grid</h1>);
};

export default CitizenListMDG;