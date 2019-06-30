"use strict"

import React from 'react'
import {Row, Col, Button, Container, Image} from 'react-bootstrap'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component{
   
    handleCart(){
        const book = [...this.props.cart, {
            _id:this.props._id,
            title:this.props.title,
            description:this.props.description,
            images: this.props.images,
            price:this.props.price,
            quantity:1
        }]
        // CHECK IF CART IS EMPTY

        if(this.props.cart.length > 0){
            let _id = this.props._id;

            let cartIndex = this.props.cart.findIndex(function(cart){
                return cart._id === _id;
            })
            if(cartIndex === -1){
                this.props.addToCart(book);
            } else {
                // WE NEED TO INCEREMENT QUANTITY
                this.props.updateCart(_id,1, this.props.cart);
                // console.log("\n\n\n\nWAY TO UPDATE\n\n\n\n")
            }

        } else {
            this.props.addToCart(book);
        }
    }
    constructor(){
        super();
        this.state={
            isClicked: false,
        };
    }
    onReadMore(){
        this.setState({isClicked:true})
    }

    render(){
        return(
            <Container>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} fluid/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <h5>{this.props.title}</h5>
                        <p>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0,50)):(this.props.description)}
                            <button className='link' onClick={this.onReadMore.bind(this)}>{(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...read more'):('')}
                            </button>
                        </p>
                        <h6> usd. {this.props.price}</h6>
                        <Button variant='primary' onClick={this.handleCart.bind(this)}>Buy Now</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
function mapStateToProps(state){
    return{
        cart:state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart:addToCart,
        updateCart:updateCart
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BookItem);