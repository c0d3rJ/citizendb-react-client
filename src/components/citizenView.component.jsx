import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Modal, Table, TableBody, TableCell, TableRow} from "@mui/material";

function CitizenViewComponent({citizenViewData, handleClose, open}){

	return (
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
								<TableCell align="right">{citizenViewData.name} {citizenViewData.surname}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Date of Birth</TableCell>
								<TableCell align="right">{citizenViewData.dob}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>National Registration Number</TableCell>
								<TableCell align="right">{citizenViewData.nrn}</TableCell>
							</TableRow>
						</TableBody>
						<TableRow>
							<TableCell>Gender</TableCell>
							<TableCell align="right">{citizenViewData.gender === 'M' ? 'MALE' : 'FEMALE'}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Address</TableCell>
							<TableCell align="right">{citizenViewData.address}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Parish</TableCell>
							<TableCell align="right">{citizenViewData.constituency}</TableCell>
						</TableRow>
					</Table>
				</Typography>
			</Box>
		</Modal>
	)
}

export default CitizenViewComponent