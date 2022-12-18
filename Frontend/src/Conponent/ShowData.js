import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Instance from "../Instance";

const ShowData = () => {
	const [contentDetails, setContentDetails] = useState(null);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
		Instance.get(`/api-view-user`)
			.then(({ data }) => {
				console.log("userData", data);
				let temp = data?.contactData;
				temp.reverse();
				setContentDetails(temp);
				setLoader(false);
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
				setLoader(false);
			});
	}, []);

	return (
		<>
			<div className=' d-flex justify-content-center mt-5'>
				<div className='card w-100 loginCard' style={{ maxWidth: "1000px" }}>
					<h2>Contact Details</h2>
					<div className='card-body text-center'>
						<div className='row mb-4 ml-2'>
							<Link to='/' className='themeButton loginButton'>
								Back
							</Link>
						</div>
						{loader ? (
							<div className='d-flex justify-content-center'>
								<div className='spinner-border' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						) : (
							<div style={{ overflow: "scroll" }}>
								<table className='table'>
									<thead>
										<tr>
											<th scope='col'>Id</th>
											<th scope='col'>Date & Time</th>
											<th scope='col'>First Name</th>
											<th scope='col'>Last Name</th>
											<th scope='col'>Email</th>
											<th scope='col'>Phone</th>
											<th scope='col'>Subject</th>
											<th scope='col'>Description</th>
										</tr>
									</thead>
									<tbody>
										{contentDetails &&
											contentDetails.map((value, i) => (
												<tr key={i}>
													<td>{i + 1}</td>
													<td>
														{moment(new Date(value?.createdAt)).format(
															"DD/MM/YYYY"
														)}
														<br />

														{new Date(value?.createdAt).toLocaleTimeString()}
													</td>
													<td>{value.firstName}</td>
													<td>{value.lastName}</td>
													<td>{value.email}</td>
													<td>{value.phone}</td>
													<td>{value.subject}</td>
													<td>{value.description}</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ShowData;
