import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../../css/modals/Modal.module.css";
import styleschecks from "../../css/generals/Checkbox.module.css";

export default function ModalGeneric(props) {
    
    function handleOnSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size={props.size}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                key={props.id}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className={styles.modalBody}
                    style={{
                        display:
                            props.configDefault === true ||
                            props.action === "desbloquear"
                                ? "none"
                                : "block",
                    }}
                >
                    {props.children !== undefined ? (
                        props.children
                    ) : props.action === "desbloquear" ? (
                        <></>
                    ) : (
                        <form onSubmit={handleOnSubmit}>
                            {props.objects &&
                                props.objects.map((el) =>
                                    el.type === "checkbox" ? (
                                        <div
                                            key={el.key}
                                            className={
                                                styleschecks.containerDiv
                                            }
                                            style={{
                                                justifyContent: "space-between",
                                                display:
                                                    el.display === false
                                                        ? "none"
                                                        : "flex",
                                            }}
                                        >
                                            <label
                                                className={
                                                    styleschecks.sliderLabel
                                                }
                                            >
                                                {el.label}
                                            </label>
                                            <label
                                                className={styleschecks.switch}
                                            >
                                                <input
                                                    key={props.key}
                                                    id={el.id}
                                                    value={el.value}
                                                    checked={el.value}
                                                    name={el.name}
                                                    onChange={props.onChange}
                                                    type="checkbox"
                                                    className="focus"
                                                />
                                                <span
                                                    className={`${styleschecks.slider} ${styleschecks.round} ${styleschecks.inputsLabels}`}
                                                />
                                            </label>
                                        </div>
                                    ) : el.type === "password" ? (
                                        <div
                                            key={el.key}
                                            className={styles.spacePasswords}
                                            style={{
                                                display:
                                                    el.display === false
                                                        ? "none"
                                                        : "block",
                                            }}
                                        >
                                            <label className="label-users">
                                                {el.label}:{" "}
                                            </label>
                                            <input
                                                key={props.key}
                                                placeholder={el.placeholder}
                                                id={el.id}
                                                value={el.value}
                                                onChange={props.onChange}
                                                type="password"
                                                className="inputs-users focus"
                                            />
                                        </div>
                                    ) : el.type === "options" ? (
                                        <div
                                            className={
                                                el.id === "sendMessagesDestiny" 
                                                ? styleschecks.containerDivMessage
                                                : styleschecks.containerDiv
                                            }
                                            style={{
                                                display:
                                                    el.display === false
                                                        ? "none"
                                                        : "flex",
                                            }}
                                        >
                                            <label
                                                className={
                                                    styleschecks.sliderLabel
                                                }
                                            >
                                                {el.label}
                                            </label>
                                            <select
                                                id={el.id}
                                                onChange={props.onChange}
                                                class="form-control"
                                                style={{ width: "100%" }}
                                                name="resolution_images"
                                                defaultValue={
                                                    props.title === "Enviar Mensaje" || props.title === "Enviar Mensaje al Grupo"
                                                        ? props.destiny
                                                        : "default"
                                                }
                                                className={styleschecks.focus}
                                            >
                                                {props.title === "Enviar Mensaje" || props.title === "Enviar Mensaje al Grupo" ?
                                                    null : (
                                                        <option
                                                            value="default"
                                                            disabled
                                                        >
                                                            {el.default}
                                                        </option>
                                                )}

                                                {el.options &&
                                                    el.options.map((option) => (
                                                        <option
                                                            value={option.value}
                                                        >
                                                            {option.title}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    ) : el.type === "area" ? (
                                        <div
                                            className={el.id === "sendMessagesMessage" || el.id === "sendMessagesMessageDash"
                                                ? styleschecks.containerDivMessage
                                                : styleschecks.containerDiv
                                            }
                                            style={{
                                                display:
                                                    el.display === false
                                                        ? "none"
                                                        : "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div style={{ width: "auto" }}>
                                                <label
                                                    className={
                                                        styleschecks.sliderLabel
                                                    }
                                                >
                                                    {el.label}
                                                </label>
                                                <small className="text-muted">
                                                    {el.small}
                                                </small>
                                            </div>

                                            <div style={{ width: "100%" }}>
                                                <textarea
                                                    key={el.key}
                                                    style={{
                                                        height: "7rem",
                                                        resize: "none"
                                                    }}
                                                    placeholder={el.placeholder}
                                                    id={el.id}
                                                    name={el.name}
                                                    value={el.value}
                                                    onChange={props.onChange}
                                                    type={el.type}
                                                    className={
                                                        (styles.inputModal,
                                                        styles.inputUsers,
                                                        styleschecks.focus)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : el.type === "range" ? (
                                        <div
                                            className="containerDiv"
                                            style={{
                                                display:
                                                    el.display === false
                                                        ? "none"
                                                        : "block",
                                            }}
                                        >
                                            <label className="slider-label">
                                                {el.label}
                                            </label>
                                            <input
                                                key={el.key}
                                                id={el.id}
                                                value={el.value}
                                                name={el.name}
                                                onChange={props.onChange}
                                                type={el.type}
                                                min="0"
                                                max="100"
                                            />
                                            <small className="text-muted">
                                                {`${el.value}%`}
                                            </small>
                                        </div>
                                    ) : (
                                        <div
                                            className={el.id === "sendMessagesTitle" || el.id === "sendMessagesTitleDash"
                                                ? styleschecks.containerDivMessage
                                                : styleschecks.containerDiv
                                            }
                                            id={`div${el.id}`}
                                            style={{
                                                justifyContent:
                                                    el.type === "number"
                                                        ? "space-between"
                                                        : "center",
                                                margin: "0px 0px 15px 0px",
                                                display:
                                                    el.display === false
                                                        ? "none"
                                                        : "flex",
                                            }}
                                        >
                                            <div>
                                                <label
                                                    className={
                                                        styleschecks.sliderLabel
                                                    }
                                                >
                                                    {el.label}
                                                </label>
                                                <small className="text-muted">
                                                    {el.small}
                                                </small>
                                            </div>
                                            <div
                                                style={{
                                                    width:
                                                        el.type === "number"
                                                            ? "fit-content"
                                                            : "100%",
                                                    justifyContent: "flex-end",
                                                    display: "flex",
                                                }}
                                            >
                                                <input
                                                    key={el.key}
                                                    placeholder={el.placeholder}
                                                    id={el.id}
                                                    name={el.name}
                                                    value={el.value}
                                                    onChange={props.onChange}
                                                    type={el.type}
                                                    style={{
                                                        width:
                                                            el.type === "number"
                                                                ? "6rem"
                                                                : "100%",
                                                    }}
                                                    className={
                                                        styleschecks.focus
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                        </form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {props.viewBtnClose === false ? null : (
                        <Button onClick={props.onClose} variant="danger">
                            {props.btnError}
                        </Button>
                    )}
                    {props.viewBtnSuccess === false ? null : (
                        <Button onClick={props.actionSuccess} variant="primary" id="btnModalSucess" >
                            {props.btnSuccess}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}
