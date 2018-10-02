import * as React from "react";
import * as ReactDOM from "react-dom";
import Index from "./components/Index";
import JsPsych from './components/JsPsych';

const e = (
    <div>
        <JsPsych />
        <Index />
    </div>
);

ReactDOM.render(
    e,
    document.getElementById("sparoot")
);
