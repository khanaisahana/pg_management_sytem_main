import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <h1>PG Management App</h1>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
