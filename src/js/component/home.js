import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [theList, getList] = useState([
		"clean the house",
		"go shopping",
		"wash the car"
	]);
	// on useState, if you change whats inside the square brackets, it will  fill the input field to whatever is inside
	// the input field is now in control of the userinput
	const [userInput, setUserInput] = useState([""]);

	const handleKeyUp = event => {
		if (event.keyCode == 13 && userInput != "") {
			getList(theList.concat(userInput));
			setUserInput("");
		}
	};

	const itemDelete = index => {
		var updatedList = theList.filter(
			(task, taskIndex) => index != taskIndex
		);
		getList(updatedList);
	};

	return (
		<div className="d-flex mx-auto justify-content-center">
			<h1 className="row">TODOs</h1>
			<div className="card">
				<input
					className="todoInput"
					// event can be named anything since the arrow function knows what to do
					onChange={event => setUserInput(event.target.value)}
					// event.target.value and value have no relation to each other.
					value={userInput}
					onKeyUp={handleKeyUp}
				/>
				<ul className="list-group list-group-flush">
					{theList.map((value, index) => {
						return (
							<li className="list-group-item" key={index}>
								{value}
								<button
									type="button"
									// onClick is an attribute, the function code runs if its {itemDelete}, so you must
									// run onClick with an arrow function in order to run when the user clicks
									// onClick runs as soon as the page loads if it's not on an arrow function
									onClick={() => itemDelete(index)}
									className="btn btn-primary">
									X
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
