import React, { useState } from "react";
import {Link} from 'react-router-dom'
const Login = props => {

	const initialUserState = {
		name: "",
		id: "",
	};

	const [user, setUser] = useState(initialUserState);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};

	const login = () => {
		props.login(user)
		console.log(user)
		// props.history.push('/');
	}

	return (
		<div className="submit-form">
			<div>
				<div className="form-group">
					<label htmlFor="user">Username</label>
					<input
						type="text"
						className="form-control"
						id="name"
						required
						value={user.name}
						onChange={handleInputChange}
						name="name"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="id">ID</label>
					<input
						type="text"
						className="form-control"
						id="id"
						required
						value={user.id}
						onChange={handleInputChange}
						name="id"
					/>
				</div>

				<Link onClick={login} to="/restaurants"><button className="btn btn-success">
					Login
				</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;