import React from "react";

export default function Button(props) {
    return (
        <>
            <button
                key={props.title}
                id={props.id}
                type="button"
                class={props.class}
                onClick={props.click}
                style={props.style}
            >
                {props.icon} {props.title}
            </button>
        </>
    );
}
