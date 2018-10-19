import * as React from 'react';
import JND from '../JND';
import Stevens from '../Stevens';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            condition: 'base',
            showJndExperiment: false,
            showStevensExperiment: false
        };
    }

    _handleJndScatterButtonClick() {
        this.setState({ showJndExperiment: true });
    }

    _handleJndScatterRainbowButtonClick() {
        this.setState({
            condition: 'distractor_rainbow',
            showJndExperiment: true
        });
    }

    _handleStevensScatterButtonClick() {
        this.setState({ showStevensExperiment: true });
    }

    render() {
        const { showJndExperiment, showStevensExperiment, condition } = this.state;

        if (showJndExperiment) {
            return <JND graphType="scatter" condition={condition} />
        } else if (showStevensExperiment) {
            return <Stevens graphType="scatter" condition={condition} />
        } else {
            return (
                <div className="box">
                    <img src="../img/VCL_lab_logo.png"></img>
                    <h1>Proof of Concept Experiments</h1>
                    <br />

                <div className="btn-group">
                    <button className="btn btn-info btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: '250px' }}>
                    JND
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{ width: '250px' }}>
                        <h6 className="dropdown-header">Foundational</h6>
                        <a className="dropdown-item" onClick={this._handleJndScatterButtonClick.bind(this)}>Scatter : Base</a>
                        <a className="dropdown-item" href="/jnd_strip">Strip : Base</a>
                        <h6 className="dropdown-header">Design</h6>
                        <a className="dropdown-item" onClick={this._handleJndScatterRainbowButtonClick.bind(this)}>Scatter: Distractor Rainbow</a>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-info btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: '250px', marginLeft: '20px' }}>
                    Stevens
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{ width: '250px' }}>
                        <h6 className="dropdown-header">Foundational</h6>
                        <a className="dropdown-item" href="/stevens_scatter">Scatter: Base</a>
                        <a className="dropdown-item" href="/stevens_strip">Strip : Base</a>
                    </div>
                </div>
                </div>
            );                
        }
    }
}