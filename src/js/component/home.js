import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [theList, setList] = useState([
		"clean the house",
		"go shopping",
		"wash the car"
	]);

	const [userInput, setUserInput] = useState([""]);

	return (
		<div className="text-center mt-5">
			<div className="todoList">
				<input className="todoInput" />
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
