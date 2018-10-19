import * as React from 'react';
import Script from '../Script';

export default class JsPsych extends React.Component {
    _handleMainScriptLoaded() {
        this.setState({
            shouldLoadMainScript: false
        });
    }
    
    constructor(props) {
        super(props);

        this.state = {
            shouldLoadMainScript: true
        };
    }

    render() {
        const { shouldLoadMainScript } = this.state;

        if (shouldLoadMainScript) {
            return (
                <Script src="https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/jspsych.js" onload={this._handleMainScriptLoaded.bind(this)} />
            );
        } else {
            return (
                <div>
                    <Script src="https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/plugins/jspsych-html-keyboard-response.js" />
                    <Script src="https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/plugins/jspsych-image-keyboard-response.js" />
                    <Script src="https://cdn.jsdelivr.net/gh/jspsych/jsPsych@6.0.4/plugins/jspsych-external-html.js" />
                    <Script src="https://unpkg.com/mathjs@4.4.2/dist/math.min.js" />
                </div>
            );
        }
    }
}