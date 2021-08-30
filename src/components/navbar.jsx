import React, {Component} from 'react';

/*
const NavBar = props => { // notice the props parameter
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#"
                >
                    Navbar
                    <span
                        className="badge badge-pill badge-secondary"
                    >
                        {props.totalCounters} // it receives its data from the argument to this function (don't do "this.props.etc")
                    </span>
                </a>
            </div>
        </nav>
    );
};
*/ // Above (stateless functional component) and below (class component) definitions are identical.

class NavBar extends Component {
    render() {
        console.log("NavBar - Rendered");
        const {onLightMode, onDarkMode}= this.props;
        const darkModeButton = this.props.darkMode ?
            <button
                onClick={onLightMode}
                className="btn btn-light btn-sm m-2"
            >
                ☀ Light Mode
            </button> :
            <button
                onClick={onDarkMode}
                className="btn btn-dark btn-sm m-2"
            >
                ☾ Dark Mode
            </button>;
        const navBarTheme = this.props.darkMode ?
            "navbar navbar-dark bg-dark" :
            "navbar navbar-light bg-light" ;

        const textTheme = this.props.darkMode ?
            "text-light" :
            "text-dark" ;

        const addressPortNotice =
            (this.props.serverInfo.address !== "unknown" && this.props.serverInfo.port !== "unknown") ?
                <div>
                    <bdi className={textTheme}>Fetching from </bdi>
                    <bdi className="text-danger">{this.props.serverInfo.address}</bdi>
                    <bdi className={textTheme}>:</bdi>
                    <bdi className="text-success">{this.props.serverInfo.port}</bdi>
                    <bdi className={textTheme}>.</bdi>
                </div> :
            (this.props.serverInfo.address === "unknown" && this.props.serverInfo.port !== "unknown" ?
                <div>
                    <bdi className={textTheme}>Fetching from port </bdi>
                    <bdi className="text-success">{this.props.serverInfo.port}</bdi>
                    <bdi className={textTheme}> of an unknown address.</bdi>
                </div>
                 :
            (this.props.serverInfo.address !== "unknown" && this.props.serverInfo.port === "unknown" ?
                <div>
                    <bdi className={textTheme}>Fetching from </bdi>
                    <bdi className="text-danger">{this.props.serverInfo.address}</bdi>
                    <bdi className={textTheme}> with unknown port. </bdi>
                </div> :
                <div>
                    <bdi className={textTheme}>Could not connect to any server. Have you tried running the server application?</bdi>
                </div> ) ) ;
        return (
            <nav className={navBarTheme}>
                {darkModeButton}
                {addressPortNotice}
                <div className="container-fluid">
                    <a
                        className="navbar-brand"
                        href="#"
                    >
                        Currently inspecting
                        <span
                            className="badge badge-pill badge-secondary m-2"
                        >
                            {this.props.itemsBeingInspected}
                        </span>
                        different items.
                        <br/>
                        Unique items in cart:
                        <span
                            className="badge badge-pill badge-secondary m-2"
                        >
                            {this.props.totalUnique}
                        </span>
                        <br/>
                        Total items in cart:
                        <span
                            className="badge badge-pill badge-secondary m-2"
                        >
                            {this.props.totalItems}
                        </span>
                    </a>
                </div>
            </nav>
        );
    }
}

export default NavBar;