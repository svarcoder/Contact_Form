import React from "react";
import { Route, Switch } from "react-router";
import Home from "../Conponent/Home";
import ShowData from "../Conponent/ShowData";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Home}></Route>
				<Route exact path='/showData' component={ShowData}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
