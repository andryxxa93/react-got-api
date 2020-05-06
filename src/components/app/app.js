import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BookPage, HousePage} from '../pages';
import gotService from '../../services/gotService';


const ToggleButton = styled.button `
    padding: 12px;
    background-color: #1e2edb;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 40px;
    outline: none;
    box-shadow: 0px 0px 30px rgba(256,256,256,.1);
    cursor: pointer;
    `


export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
    }
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }


    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    render() {

        const char = (this.state.showRandomChar) ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }
    
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <ToggleButton
                            onClick={this.toggleRandomChar}>
                            Toggle random character</ToggleButton>
                        </Col>
                    </Row>
                   <CharacterPage/>
                   <BookPage/>
                   <HousePage/>
                    {/* <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData = {this.gotService.getAllBooks}
                            renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <ItemDetails 
                            charId = {this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData = {this.gotService.getAllHouses}
                            renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <ItemDetails 
                            itemId = {this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                </Container>
            </>
        );
    }
};
