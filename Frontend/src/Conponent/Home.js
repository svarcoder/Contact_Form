import React, { useState } from "react";
import Instance from "../Instance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Home = () => {
	const [details, setDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "",
		description: "",
	});

	const handelChange = (e) => {
		setDetails({
			...details,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		Instance.post("/api-add-user", {
			firstName: details.firstName,
			lastName: details.lastName,
			email: details.email,
			phone: details.phone,
			subject: details.subject,
			description: details.description,
		})
			.then(({ data }) => {
				console.log("save", data);

				setDetails({
					firstName: "",
					lastName: "",
					email: "",
					phone: "",
					subject: "",
					description: "",
				});
				toast.success("Our Customer Support will Call You!");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
				toast.error(err?.response?.data?.messege[0]?.msg);
				toast.error(err?.response?.data?.error?.message);
			});
	};
	return (
		<>
			<div>
				<ToastContainer />
				<div className='m-5 d-flex justify-content-center '>
					<div className='card w-100 loginCard' style={{ maxWidth: "800px" }}>
						<h2>Contact Form</h2>
						<div className='card-body text-left'>
							<div className='d-flex flex-row p-0 justify-content-start align-items-center'>
								<Link to='/showData' className='themeButton loginButton'>
									View
								</Link>
							</div>

							<form>
								<div className='form-group'>
									<label htmlFor='exampleInputEmail1'>First Name</label>
									<input
										type='text'
										className='form-control'
										aria-describedby='emailHelp'
										id='firstName'
										placeholder='First Name'
										value={details.firstName}
										onChange={handelChange}
										autoComplete='off'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='exampleInputEmail1'>Last Name</label>
									<input
										type='text'
										className='form-control'
										aria-describedby='emailHelp'
										id='lastName'
										placeholder='Last Name'
										value={details.lastName}
										onChange={handelChange}
										autoComplete='off'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='exampleInputEmail1'>Email address</label>
									<input
										type='email'
										className='form-control'
										aria-describedby='emailHelp'
										id='email'
										placeholder='Email'
										value={details.email}
										onChange={handelChange}
										autoComplete='off'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='exampleInputPassword1'>Phone</label>
									<input
										type='number'
										className='form-control'
										id='phone'
										placeholder='Phone'
										value={details.phone}
										onChange={handelChange}
										autoComplete='off'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='exampleInputPassword1'>Subject</label>
									<input
										type='text'
										className='form-control'
										id='subject'
										placeholder='Subject'
										value={details.subject}
										onChange={handelChange}
										autoComplete='off'
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='exampleInputPassword1'>Description</label>
									<input
										type='text'
										className='form-control'
										id='description'
										placeholder='Description'
										value={details.description}
										onChange={handelChange}
										autoComplete='off'
									/>
								</div>
								<div className='d-flex flex-row p-0 justify-content-center align-items-center'>
									<button
										type='submit'
										className='themeButton loginButton'
										onClick={(e) => onSubmitSignIn(e)}>
										Send
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
