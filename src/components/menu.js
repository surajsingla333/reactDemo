"use strict"
import React from 'react';
import {Form, FormControl, Navbar, Nav, Badge} from 'react-bootstrap';

class Menu extends React.Component{
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link eventKey={2} href="/cart">
                        Your Cart 
                        { (this.props.cartItemsNumber > 0) ? (<Badge className='badge' >{this.props.cartItemsNumber}</Badge>):('')}
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            // <Navbar bg="dark" variant="dark" fixed="top">
            //     <Navbar.Brand href="/">Navbar</Navbar.Brand>
            //     <Navbar.Collapse id="responsive-navbar-nav">
            //     <Nav className="mr-auto">
            //         <Nav.Link href="/about">About</Nav.Link>
            //         <Nav.Link href="/contact">Contact</Nav.Link>
            //     </Nav>
            //     <Nav className="mr-auto">
            //         <Nav.Link href="/admin">Admin</Nav.Link>
            //         <Nav.Link href="/cart">Your Cart <Badge className='badge'>1</Badge></Nav.Link>
            //     </Nav>
            //     </Navbar.Collapse>
            // </Navbar>
        )
    }
}

export default Menu;