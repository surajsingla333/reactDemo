"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel, Container, Col, Row,Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BookList extends React.Component{
    
    componentDidMount(){
        this.props.getBooks();
    }
    
    render(){
        console.log("GETTING BOOKS", this.props.books);
        const booksList = this.props.books.map(function(booksArr){
            return(
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem 
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price= {booksArr.price}/>
                </Col>
            )
        })
        return(
            <Container style={{marginTop:'100px'}}>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/images/1.jpeg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/images/2.jpeg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                {/* <Row>
                    <Cart />
                </Row> */}
                <Row style={{marginTop: '15px'}}>
                    {booksList}
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state){
    return{
        books:state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks:getBooks
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);