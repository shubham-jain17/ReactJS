import React from 'react';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {favoritecolor: "red"};
    }
    render() {
        return (
            <h1>My Favorite Color is {this.state.favoritecolor}</h1>
        );
    }
}
export default Header;