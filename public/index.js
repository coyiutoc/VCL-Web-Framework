import * as React from "react";
import * as ReactDOM from "react-dom";
import Index from "./components/Index";
import ExternalScripts from './components/ExternalScripts';

const e = (
    <div>
        <ExternalScripts />
        <Index />
    </div>
);

ReactDOM.render(
    e,
    document.getElementById("sparoot")
);
