import React, { useState, useEffect } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiFillCheckSquare } from "react-icons/ai";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [theList, setList] = useState([]);
	// on useState, if you change whats inside the square brackets, it will  fill the input field to whatever is inside
	// the input field is now in control of the userinput
	const [userInput, setUserInput] = useState([""]);

	const URL = "https://3000-aquamarine-otter-6co5ssm1.ws-us03.gitpod.io"; // not sure to leave it here for review or not?

	useEffect(() => {
		fetch(`${URL}/todolist/rolando`)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				setList(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			setList(
				theList.concat({
					label: userInput,
					done: false
				})
			);

			fetch(`${URL}/todolist`, {
				method: "POST",
				body: JSON.stringify({
					user: "rolando",
					label: userInput,
					done: false
				}),
				// label, done
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				})
				.then(response => {
					console.log("Success:", response);
					setList(response);
					setUserInput([""]);
				})
				.catch(error => console.error("Error:", error));
		}
	};
	const modifyTask = (id, label) => {
		fetch(`${URL}/todolist/` + id, {
			method: "PUT",
			body: JSON.stringify({
				user: "rolando",
				label: label,
				done: true
			}),
			// label, done
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				setList(response);
			})
			.catch(error => console.error("Error:", error));
	};
	// handleKeyUp from onKeyUp on input text with event passed as default
	// check if event keycode is 13 (enter) and input is not blank to continue
	// use state setList to add concat version of userInput into theList

	const itemDelete = id => {
		fetch(`${URL}/todolist/rolando/` + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(response => {
				console.log("Success:", response);
				setList(response);
			})
			.catch(error => console.error("Error:", error));
	};
	// create new variable with updated list > filter to check if index matches original index from list. then use setList to update to new list.

	return (
		<div className="container">
			<div className="header text-center">TODOs</div>
			<div className="d-flex mx-auto justify-content-center">
				<div className="card">
					<input
						className="todoInput py-2"
						// event can be named anything since the arrow function knows what to do
						onChange={event => setUserInput(event.target.value)}
						// event.target.value and value have no relation to each other.
						value={userInput}
						onKeyUp={handleKeyUp}
					/>
					<ul className="list-group list-group-flush">
						{theList.map((value, index) => {
							return (
								<li
									className="list-group-item mx-1 py-1"
									key={index}>
									{value.label}
									<button
										type="button"
										className="btn float-right"
										onClick={() =>
											modifyTask(value.id, value.label)
										}>
										<AiFillCheckSquare />
									</button>
									<button
										type="button"
										// onClick is an attribute, the function code runs if its {itemDelete}, so you must
										// run onClick with an arrow function in order to run when the user clicks
										// onClick runs as soon as the page loads if it's not on an arrow function
										onClick={() => itemDelete(value.id)}
										className="btn float-right">
										<RiDeleteBin7Line />
									</button>
								</li>
							);
						})}
						<div className="footer text-left text-muted p-2 py-1">
							{theList.length === 0
								? "There are no tasks, start adding!"
								: theList.length + " items left."}
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
}
