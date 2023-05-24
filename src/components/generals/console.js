import React, { useEffect } from "react";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import "../../css/generals/TerminalDemo.css";

export default function TerminalDemo(props) {
    useEffect(() => {
        TerminalService.on("command", commandHandler);

        return () => {
            TerminalService.off("command", commandHandler);
        };
    }, []);

    const commandHandler = (text) => {
        let response;
        let argsIndex = text.indexOf(" ");
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case "date":
                response = "Today is " + new Date().toDateString();
                break;

            case "greet":
                response = "Hola " + text.substring(argsIndex + 1) + "!";
                break;

            case "random":
                response = Math.floor(Math.random() * 100);
                break;

            case "clear":
                response = null;
                break;
            default:
                response = command;
                break;
        }

        if (response) {
            TerminalService.emit("response", response);
        } else {
            TerminalService.emit("clear");
        }
    };

    return (
        <div className="terminal-demo">
            <div className="card">
                <p>
                    Enter "<strong>date</strong>" to display the current date, "
                    <strong>greet {"{0}"}</strong>" for a message, "
                    <strong>random</strong>" to get a random number and "
                    <strong>clear</strong>" to clear all commands.
                </p>
                <Terminal
                    welcomeMessage="Welcome to PrimeReact"
                    prompt="primereact $"
                />
            </div>
        </div>
    );
}
