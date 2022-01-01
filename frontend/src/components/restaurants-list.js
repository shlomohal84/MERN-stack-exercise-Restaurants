import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

export default function RestaurantsList() {
	const [restaurants, setRestaurants] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchZip, setSearchZip] = useState("");
	const [searchCuisine, setSearchCuisine] = useState("");
	const [cuisines, setCuisines] = useState(["All Cuisines"]);

	useEffect(() => {
		retrieveRestaurants();
		retrieveCuisines();
	}, []);

	const onChangeSearchName = e => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	const onChangeSearchZip = e => {
		const searchZip = e.target.value;
		setSearchZip(searchZip);
	};

	const onChangeSearchCuisine = e => {
		const searchCuisine = e.target.value;
		setSearchCuisine(searchCuisine);

	};

	const retrieveRestaurants = () => {
		RestaurantDataService.getAll()
			.then(response => {
				console.log(response.data);
				setRestaurants(response.data.restaurants);

			})
			.catch(e => {
				console.log(e);
			});
	};

	const retrieveCuisines = () => {
		RestaurantDataService.getCuisines()
			.then(response => {
				setCuisines(["All Cuisines"].concat(response.data));

			})
			.catch(e => {
				console.log(e);
			});
	};

	const refreshList = () => {
		retrieveRestaurants();
	};

	const find = (query, by) => {
		RestaurantDataService.find(query, by)
			.then(response => {
				console.log(response.data);
				setRestaurants(response.data.restaurants);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const findByName = () => {
		find(searchName, "name")
	};

	const findByZip = () => {
		find(searchZip, "zipcode")
	};

	const findByCuisine = () => {
		if (searchCuisine === "All Cuisines") {
			refreshList();
		} else {
			find(searchCuisine, "cuisine")
		}
	};

	return (
		<div>
			<div className="row pb-1">
				<div className="col-lg-4">
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Search by name" value={searchName}
							onChange={onChangeSearchName} />
						<button className="btn btn-outline-secondary" type="button" onClick={findByName} > Search </button>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Search by zip" value={searchZip}
							onChange={onChangeSearchZip} />
						<button className="btn btn-outline-secondary" type="button" onClick={findByZip} > Search </button>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="input-group">
						<select onChange={onChangeSearchCuisine}>
							{cuisines.map((cuisine, idx) => {
								return (
									<option value={cuisine} key={idx}> {cuisine.slice(0, 10)} </option>
								)
							})}
						</select>
						<button className="btn btn-outline-secondary" type="button" onClick={findByCuisine} > Search </button>
					</div>
				</div>
			</div>
			<div className="row">
				{restaurants.map(((restaurant, idx) => {
					const address = `${restaurant.address.building} ${restaurant.address.street.slice(0,10)}, ${restaurant.address.zipcode}`;
					return (
						<div className="col-lg-4 pb-1" key={idx}>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{restaurant.name}</h5>
									<p className="card-text">
										<strong>Cuisine: </strong>{restaurant.cuisine}<br />
										<strong>Address: </strong>{address}
									</p>
									<div className="row">
										<div className="col-6 ps-auto pe-0 pb-1">
											<Link to={"/restaurants/" + restaurant._id} className="btn btn-primary mx-auto">
												View Reviews
											</Link>
										</div>
										<div className="col-6 pe-0 ps-0 pb-1">
											<a rel="noreferrer" target="_blank" href={"https://www.google.com/maps/place/" + address}
												className="btn btn-primary mx-auto">
												View Map
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				}))}


			</div>
		</div>
	);
};

