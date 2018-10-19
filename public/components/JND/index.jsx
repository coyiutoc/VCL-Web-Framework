import * as React from 'react';
import JND from '../../scripts/experiments/jnd';
import { ExecJsPsych } from '../../scripts/timelines/jnd_timeline';

export default class JndExperiment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentWillMount() {
        let experiment = new JND("foundational", this.props.condition, this.props.graphType);
        ExecJsPsych(experiment);
    }

    render() {
        return <div>This is the JND thingy?</div>
    }
}