import http from "../http-common";

const filterByNamesAndDoB = (params) => {
	return http.get("/filterByNamesAndDoB", { params });
};

const getById = (id) => {
	return http.get(`/getById/${id}`);
};

const findByTitle = (title) => {
	return http.get(`/citizens?title=${title}`);
};

const CitizenService = {
	filterByNamesAndDoB,
	getById,
	findByTitle,
};

export default CitizenService;