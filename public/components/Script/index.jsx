import * as React from 'react';

export default class Script extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = this.props.src;
        script.onload = this.props.onload;

        document.body.appendChild(script);
    }

    render() {
        return (null);
    }
}