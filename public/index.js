import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactDOMServer from 'react-dom/server';

import { Hello } from "./components/Hello";

const e = <Hello compiler="VCLLLLLLL" framework="ohnoiatethewholepizza" />;

ReactDOM.render(
    e,
    document.getElementById("banana")
);

console.log(ReactDOMServer.renderToStaticMarkup(e));
