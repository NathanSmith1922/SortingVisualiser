import React from "react";
import { getMergeSortAnimations } from "../SortingAlgoirthms/SortingAlgorithms";
import './SortingVisualiser.css';

// Speed of the animation
const ANIMATION_SPEED = 2;

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
            array.push(randomIntFromInterval(5,580));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? "white" : "#5D3FD3";
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    //Sets up the css
    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                <h1 className="header">SORTING VISUALISER</h1>
                <div className="bar-container">
                {array.map((value, idx) => (
                    <div
                    className="array-bar"
                    key={idx}
                    style={{
                        backgroundColor: "#5D3FD3",
                        height: `${value}px`,
                    }}></div>
                ))}
                </div>
                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                </div>
            </div>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}