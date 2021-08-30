import React, {Component} from "react";
import NavBar from "./components/navbar";
import './App.css';
import Counters from "./components/counters";

class App extends Component {
    state = {
        counters: [],
        purchased: false,
        isEmpty: true,
        noItems: true,
        darkMode: false,
        serverInfo: {},
    }

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleResetAll = this.handleResetAll.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);
        this.handleLightMode = this.handleLightMode.bind(this);
        this.handleDarkMode = this.handleDarkMode.bind(this);
        console.log("App - Constructor");
    }

    componentDidMount() {
        console.log("App - Mounted");
        fetch("http://127.0.0.1:80/api")
            .then(res => res.json())
            .then(
                (result) => {
                    if (typeof(result.address) !== "undefined" && typeof(result.port) !== "undefined") {
                        this.setState({
                            serverInfo: result
                        });
                    }
                    else if (typeof(result.address) === "undefined" && typeof(result.port) !== "undefined") {
                        const unknownAddress = {address: "unknown", port: result.port};
                        this.setState({
                            serverInfo: unknownAddress
                        });
                    }
                    else if (typeof(result.address) !== "undefined" && typeof(result.port) === "undefined") {
                        const unknownPort = {address: result.address, port: "unknown"};
                        this.setState({
                            serverInfo: unknownPort
                        });
                    }
                    else {
                        const unknownAddressPort = {address: "unknown", port: "unknown"};
                        this.setState({
                            serverInfo: unknownAddressPort
                        });
                    }

                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    const unknownAddressPort = {address: "unknown", port: "unknown"};
                    this.setState({
                        serverInfo: unknownAddressPort
                    });
                }
            )
    }

    handleIncrement(counter) {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].value++;
        this.setState( {
            purchased: false,
            isEmpty: false,
            counters: counters} );
    }

    handleDecrement(counter) {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].value = counters[index].value > 0 ? counters[index].value - 1 : 0;
        const isEmpty = !Boolean(counters.length > 0 ? counters.reduce( (a,b) => a + b.value, 0 ) : 0);
        this.setState( {
            purchased: false,
            isEmpty: isEmpty,
            counters: counters} );
    }

    handleResetAll() {
        const counters = this.state.counters.map(c => {c.value = 0; return c;});
        this.setState( {
            purchased: false,
            isEmpty: true,
            counters: counters} );
    }

    handleDelete(counterId) {
        const counters = this.state.counters.filter(c => c.id !== counterId);
        const isEmpty = !Boolean(counters.length > 0 ? counters.reduce( (a,b) => a + b.value, 0 ) : 0);
        const noItems = Boolean(counters.length <= 0);
        this.setState( {
            purchased: false,
            isEmpty: isEmpty,
            noItems: noItems,
            counters: counters} ); // "this.setState( {counters: counters} )" can be reduced to "this.setState( {counters} )"
    }

    handleAdd() {
        const counters = [...this.state.counters];
        const id = counters.length === 0 ? 0 : counters[counters.length - 1].id + 1;

        counters.push({
            name: "Item #" + id,
            id: id,
            value: 0
        });
        this.setState( {
            purchased: false,
            noItems: false,
            counters: counters} );
    }

    handleReset(counterId) {
        const counters = this.state.counters.map(c => {if (c.id === counterId) c.value = 0; return c;});
        const isEmpty = !Boolean(counters.length > 0 ? counters.reduce( (a,b) => a + b.value, 0 ) : 0);
        this.setState( {
            purchased: false,
            isEmpty: isEmpty,
            counters: counters} );
    }

    handleDeleteAll() {
        const counters = [];
        this.setState( {
            purchased: false,
            isEmpty: true,
            noItems: true,
            counters: counters} );
    }

    handlePurchase() {
        let counters = this.state.counters.filter(c => c.value <= 0);
        counters = counters.map(c => {c.value = 0; return c;});
        const purchased = Boolean(this.state.counters.length > 0 ? this.state.counters.reduce( (a,b) => a + b.value, 0 ) : 0);
        const noItems = Boolean(counters.length <= 0);
        this.setState( {
            purchased: purchased,
            isEmpty: purchased,
            noItems: noItems,
            counters: counters} );
    }

    handleLightMode() {
        document.body.style.backgroundColor = "white";
        this.setState( {darkMode: false} );
        console.log("Light Mode");
    }

    handleDarkMode() {
        document.body.style.backgroundColor = "rgb(50,50,50)";
        this.setState( {darkMode: true} );
        console.log("Dark Mode");
    }

    render() {
        console.log("App - Rendered");
        return (
            <React.Fragment>
                <NavBar
                    totalItems={this.state.counters.length > 0 ? this.state.counters.reduce( (a,b) => a + b.value, 0 ) : 0}
                    totalUnique={this.state.counters.filter(c => c.value > 0).length}
                    itemsBeingInspected={this.state.counters.length}
                    darkMode={this.state.darkMode}
                    onLightMode={this.handleLightMode}
                    onDarkMode={this.handleDarkMode}
                    serverInfo={this.state.serverInfo}
                />
                <main className="container">
                    <Counters
                        counters={this.state.counters}
                        onDecrement={this.handleDecrement}
                        onIncrement={this.handleIncrement}
                        onResetAll={this.handleResetAll}
                        onDelete={this.handleDelete}
                        onAdd={this.handleAdd}
                        onDeleteAll={this.handleDeleteAll}
                        onReset={this.handleReset}
                        onConfirmPurchase={this.handlePurchase}
                        purchased={this.state.purchased}
                        isEmpty={this.state.isEmpty}
                        noItems={this.state.noItems}
                        darkMode={this.state.darkMode}
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default App;

