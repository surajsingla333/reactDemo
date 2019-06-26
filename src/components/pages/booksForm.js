"use strict"

import React from 'react';
import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import{findDOMNode} from 'react-dom';
import {postBooks, deleteBooks} from '../../actions/booksActions';

class BooksForm extends React.Component{
    
    handleSubmit(){
        const book=[{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value,
        }]
        this.props.postBooks(book);
    }

    onDelete(){
        let bookName = findDOMNode(this.refs.delete).value;

        const booksId = this.props.books.map(function(booksArr){
            if(bookName === booksArr.title){
                return(
                    booksArr._id
                )   
            }
        })
        
        this.props.deleteBooks(booksId[0]);
    }

    render(){

        const booksList = this.props.books.map(function(booksArr){
            return(
                <option key={booksArr._id}>{booksArr.title}</option>
            )
        });

        return (
            <Container>
            <Form>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" 
                    ref="title"/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" 
                    ref="description"/>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter price" 
                    ref="price"/>
                </Form.Group>
                <Button onClick={this.handleSubmit.bind(this)} bsStype='primary'>Save Book</Button>
            </Form>
            <Form style={{marginTop:'25px'}}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select a book to delete.</Form.Label>
                    <Form.Control ref='delete' as="select">
                    <option value='select'>Select</option>
                    {booksList}
                    </Form.Control>
                </Form.Group>
                <Button onClick={this.onDelete.bind(this)} variant='danger'>Delete Book</Button>
            </Form>
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postBooks,
        deleteBooks
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);