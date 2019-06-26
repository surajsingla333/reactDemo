"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Container, Modal, From, Col, Row, Button, ButtonGroup, Badge} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions'

class Cart extends React.Component{
    
    constructor() {
        super();

        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {
        show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onIncrement(_id){
        this.props.updateCart(_id, 1);
    }

    onDecrement(_id, quantity){
        if(quantity > 1){
            this.props.updateCart(_id, -1);
        }
        else {
            this.onDelete(_id);
        }
    }

    onDelete(_id){
        const currentBookToDelete = this.props.cart;
        
        const indexToDelete = currentBookToDelete.findIndex(
            function(cart){
                return cart._id === _id;
            }
        )

        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]

        this.props.deleteCartItem(cartAfterDelete);
    }
    
    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return(<div></div>)
    }
    renderCart(){
        const cartItemsList = this.props.cart.map(function(cartArr){
            return(
                <Container key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6> usd.{cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Badge variant='success'>{cartArr.quantity}</Badge></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} variant='default' size='sm'>-</Button>
                                <Button onClick={this.onIncrement.bind(this,cartArr._id)} variant='default' size='sm'>+</Button>
                                <span>     </span>
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} variant='danger' size='sm'>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            )
        }, this)
        return(
            <Container header="Cart" variant='primary'>
                {cartItemsList}
                <Row>
                    <Col>
                        <h6>Total amount: ${this.props.totalAmount}</h6>
                        <Button onClick={this.handleShow.bind(this)}variant='success' size='sm'>Proceed to Checkout</Button>
                    </Col>
                </Row>
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank You!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been confirmed.</h6>
                        <p>You will receive an email.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6> total amount : ${this.props.totalAmount}</h6>
                        </Col>
                        <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose.bind(this)}>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

}

function mapStateToProps(state){
    return{
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem:deleteCartItem,
        updateCart:updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);