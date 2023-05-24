import React from "react";
import "../../css/generals/checkbox.css";

export default function LabelCheckbox({ title, idName, type }) {
	if (type === "checkbox") {
		return (
			<div className="component-box">
				<label className="slider-label">{title}</label>
				<label className="switch">
					<input id={idName} type="checkbox" />
					<span className="slider round" />
				</label>
			</div>
		);
	} else if (type === "number") {
		return (
			<div className="component-box">
				<div>
					<label className="slider-label">{title}</label>
					<small className="text-muted">(en minutos)</small>
					<input
						id={idName}
						type="number"
						min={2}
						max={525600}
					/>
				</div>
			</div>
		);
	}
}
