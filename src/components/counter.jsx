import React, {Component} from 'react';

class Counter extends Component {
    /*
    constructor(props) {
        super(props);
    }
    */

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("prevProps", prevProps);
        console.log("prevState", prevState);
    }

    componentWillUnmount() {
        console.log("Counter - Unmount");
    }

    render() {
        console.log("Counter - Rendered");
        const textTheme = this.props.darkMode ?
            "text-light" :
            "text-dark" ;
        const decrementButton = (this.props.counter.value <= 0) ?
            <button
                onClick={ () => this.props.onDecrement(this.props.counter) }
                className="btn btn-secondary btn-sm m-1"
                disabled
            >
                -
            </button> :
            <button
                onClick={ () => this.props.onDecrement(this.props.counter) }
                className="btn btn-secondary btn-sm m-1"
            >
                -
            </button> ;
        const resetButton = (this.props.counter.value <= 0) ?
            <button
                onClick={ () => this.props.onReset(this.props.counter.id) }
                className="btn btn-warning btn-sm m-2"
                disabled
            >
                ♻ Reset
            </button> :
            <button
                onClick={ () => this.props.onReset(this.props.counter.id) }
                className="btn btn-warning btn-sm m-2"
            >
                ♻ Reset
            </button> ;
        return (
            <div>
                <span
                    className={textTheme}
                >
                    {this.props.counter.name}
                </span>
                <span
                    className={this.getBadgeClasses()}
                >
                    {this.formatCount()}
                </span>
                {decrementButton}
                <button
                    onClick={ () => this.props.onIncrement(this.props.counter) }
                    className="btn btn-secondary btn-sm m-1"
                >
                    +
                </button>
                {resetButton}
                <button
                    onClick={ () => this.props.onDelete(this.props.counter.id) }
                    className="btn btn-danger btn-sm m-2"
                >
                    🗑 Delete
                </button>
            </div>
        );
    }

    formatCount() {
        const {value} = this.props.counter;
        return value === 0 ? "∅" : value;
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        if (this.props.counter.value < 0) classes += "danger";
        else if (this.props.counter.value === 0) classes += "warning";
        else classes += "primary";
        return classes;
    }
}

export default Counter;

