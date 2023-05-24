import React from "react";
import "../../css/generals/paper.css";

export default function Paper(props) {
	return (
		<div className="bodyPaper">
            {props.element}
		</div>
	);
}
