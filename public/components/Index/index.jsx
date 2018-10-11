import * as React from 'react';
import JND from '../JND';
import DNJ from '../DNJ';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showJndExperiment: false,
            showStevensExperiment: false
        };
    }

    _handleJndScatterButtonClick() {
        this.setState({ showJndExperiment: true });
    }

    _handleStevensScatterButtonClick() {
        this.setState({ showStevensExperiment: true });
    }

    render() {
        const { showJndExperiment, showStevensExperiment } = this.state;

        if (showJndExperiment) {
            return <JND graphType="scatter" />
        } else if (showStevensExperiment) {
            return <DNJ graphType="scatter" />
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
                        <h6 className="dropdown-header">Scatter Plot</h6>
                        <a className="dropdown-item" onClick={this._handleJndScatterButtonClick.bind(this)}>Foundational</a>
                        <h6 className="dropdown-header">Strip Plot</h6>
                        <a className="dropdown-item" href="/jnd_strip">Base Strip</a>
                    </div>
                    </div>
    
                    <div className="btn-group">
                    <button className="btn btn-info btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ width: '250px', marginLeft: '20px' }}>
                        Stevens
                    </button>
    
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{ width: '250px' }}>
                        <h6 className="dropdown-header">Scatter Plot</h6>
                        <a className="dropdown-item" onClick={this._handleStevensScatterButtonClick.bind(this)}>Foundational</a>
                        <h6 className="dropdown-header">Strip Plot</h6>
                        <a className="dropdown-item" href="/stevens_strip">Base Strip</a>
                    </div>
                    </div>
                </div>
            );                
        }
    }
}