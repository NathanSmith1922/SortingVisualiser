import React from "react";
import './SortingVisualiser.css';

export default class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
        };
    }

    //When this component loads for the first time
    componentDidMount() {
        this.resetArray()
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < (window.screen.width-200)/4; i++) {
            //Pushes random value into the array
            array.push(randomIntFromInterval(5,600));
        }
        this.setState({array});
    }

    //Sets up the css
    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                    className="array-bar"
                    key={idx}
                    style={{height: `${value}px`}}></div>
                ))}
            </div>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}