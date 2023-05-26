import React from "react";
import { getMergeSortAnimations } from "../SortingAlgoirthms/SortingAlgorithms";
import { getBubbleSort } from "../SortingAlgoirthms/BubbleSort";
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

    bubbleSort() {
        let [animations, randomValue] = getBubbleSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const color = i % 4 === 0 ? "white" : "#5D3FD3";
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * (ANIMATION_SPEED -1.95));
            } else {
                const [barIdx, newHeight] = animations[i];

                if (barIdx === -1) {
                    continue;
                }

                const barStyle = arrayBars[barIdx].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * (ANIMATION_SPEED -1.95));
            }
        }
        // return arr;
    }

    // To be deleted for final production
    checkSort() {
        for (let i = 0; i < 100; i++) {
            let arr = this.state.array;
            arr.sort(function(a, b){return a - b})
    
            if (this.bubbleSort() === arr) {
                console.log(true);
            } else {
                console.log(false);
            }


            this.resetArray();
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
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.checkSort()}>Check Sort</button>
                </div>
            </div>
        )
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}