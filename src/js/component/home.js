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
		if (event.keyCode == 13) {
			getList(theList.concat(userInput));
		}
	};

	return (
		<div className="text-center mt-5">
			<div className="todoList">
				<input
					className="todoInput"
					// event can be named anything since the arrow function knows what to do
					onChange={event => setUserInput(event.target.value)}
					// event.target.value and value have no relation to each other.
					value={userInput}
					onkeyUp={handleKeyUp}
				/>
				<button className="addButton">click to add!</button>
				<ul className="list-group">
					{theList.map((value, index) => {
						return (
							<li className="list-group-item" key={index}>
								{value}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
