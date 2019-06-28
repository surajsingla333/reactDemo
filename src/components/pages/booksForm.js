"use strict"

import React from 'react';
import {MenuItem, Image, InputGroup, Dropdown, DropdownButton, Form, Col, Row, Button, Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import{findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{
    
    constructor(){
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }
    componentDidMount(){
        this.props.getBooks();

        // GET IMAGES FROM API
        axios.get('/api/images').then(function(response){
            this.setState({images:response.data});
        }.bind(this)).catch(function(err){
            this.setState({images:'error loading images files from the server', img: ""})
        }.bind(this))
    }

    resetForm(){

        this.props.resetButton();

        findDOMNode(this.refs.title).value = "",
        findDOMNode(this.refs.description).value = "",
        findDOMNode(this.refs.price).value = "",
        this.setState({img:''})
    }

    handleSelect(img){
        this.setState({
            img: '/images/' + img
        })
    }

    handleSubmit(){
        const book=[{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            images: findDOMNode(this.refs.image).value,
            price: findDOMNode(this.refs.price).value
        }]
        this.props.postBooks(book);
    }

    onDelete(){
        let bookName = findDOMNode(this.refs.delete).value;

        // SET NAME IN DROP DOWN

        // const booksId = this.props.books.map(function(booksArr){
        //     if(bookName === booksArr.title){
        //         return(
        //             booksArr._id
        //         )   
        //     }
        // })

        // const ID = booksId.map
        // console.log("\n\n");
        // console.log(booksId);
        // console.log(booksId[2]);
        // console.log("\n\n");
        this.props.deleteBooks(bookName);
    }

    render(){

        const booksList = this.props.books.map(function(booksArr){
            return(
                <option key={booksArr._id}>{booksArr._id}</option>
            )
        });

        const imgList = this.state.images.map(function(imgArr, i){
            return(
                <Dropdown.Item key={i} eventKey={imgArr.name} onClick={this.handleSelect.bind(this, imgArr.name)}> {imgArr.name}</Dropdown.Item>
            )
        }, this)

        return (
            <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <Form>
                    <InputGroup>
                        <Form.Control
                        type='text' ref='image' value={this.state.img}
                        placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"
                        />

                        <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Select an Image"
                        id="input-group-dropdown-2"
                        >
                            {imgList}
                        </DropdownButton>
                    </InputGroup>
                    < Image src={this.state.img} responsive />
                    </Form>
                </Col>
                <Col xs={12} sm={6}>
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
                        <Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} variant={(!this.props.style)?("primary"):(this.props.style)}>
                            {(!this.props.msg)?("Save book"):(this.props.msg)}    
                        </Button>
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
                </Col>
            </Row>
            
            </Container>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postBooks,
        deleteBooks,
        getBooks,
        resetButton
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);