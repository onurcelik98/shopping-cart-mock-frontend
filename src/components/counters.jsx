import React, {Component} from 'react';
import Counter from "./counter";


class Counters extends Component {
    render() {
        console.log("Counters - Rendered");
        const {onResetAll, counters, onDelete, onDecrement, onIncrement, onAdd, onDeleteAll, onReset, onConfirmPurchase} = this.props; // this is used for object destructuring
        const textTheme = this.props.darkMode ?
            "text-light" :
            "text-dark" ;
        const countersToRender = counters.length > 0 ? counters.map(counter =>
                <Counter
                    key={counter.id} // used internally by react
                    /*
                    value={counter.value}
                    id={counter.id} // used by the programmer
                    */ // instead of the above two (and possibly more new props), we can do the following:
                    counter={counter}
                    onDelete={onDelete}
                    onDecrement={onDecrement}
                    onIncrement={onIncrement}
                    onReset={onReset}
                    darkMode={this.props.darkMode}
                >
                </Counter>
            ) : <p className={textTheme}>Your shopping cart is empty. <br/> Add an item to the cart to start shopping.</p>;
        const purchaseButton = this.props.purchased ?
            <button
                className="btn btn-success btn-sm m-2"
                disabled
            >
                ✓ Items Purchased!
            </button> : (this.props.isEmpty ?
                <button
                    className="btn btn-outline-success btn-sm m-2"
                    disabled
                >
                    🛒 Confirm Purchase
                </button> :
                <button
                    onClick={onConfirmPurchase}
                    className="btn btn-outline-success btn-sm m-2 text-light bg-success"
                >
                    🛒 Confirm Purchase
                </button>) ;
        const resetAllButton = this.props.isEmpty ?
            <button
                onClick={onResetAll}
                className="btn btn-warning btn-sm m-2"
                disabled
            >
                ♻ Reset All
            </button> :
            <button
                onClick={onResetAll}
                className="btn btn-warning btn-sm m-2"
            >
                ♻ Reset All
            </button> ;
        const deleteAllButton = this.props.noItems ?
            <button
                onClick={onDeleteAll}
                className="btn btn-danger btn-sm m-2"
                disabled
            >
                🗑 Delete All
            </button> :
            <button
                onClick={onDeleteAll}
                className="btn btn-danger btn-sm m-2"
            >
                🗑 Delete All
            </button> ;

        return (
            <div>
                <button
                    onClick={onAdd}
                    className="btn btn-primary btn-sm m-2"
                >
                    ➕ Add New Item
                </button>
                {resetAllButton}
                {deleteAllButton}
                {purchaseButton}
                {countersToRender}
            </div>
        );
    }
}

export default Counters;