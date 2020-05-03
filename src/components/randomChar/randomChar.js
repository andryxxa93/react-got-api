import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const RandomBlockHeader = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const Term = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {
    gotService = new gotService();
    state = {
        char: {},
        loading: true
    }

    componentDidMount() {
        this.updateChar();
        this.idInterval = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount() {
        clearInterval(this.idInterval);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()* 200 + 25);
        // const id = 130000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        console.log('render');
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;


        return (
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char}) => {

    const {name, gender, born, died, culture} = char;

    return (
        <>
        <RandomBlockHeader>Random Character: {name}</RandomBlockHeader>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender</Term>
                    <span>{gender || 'No information'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born</Term>
                    <span>{born || 'No information'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died</Term>
                    <span>{died || 'No information'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture</Term>
                    <span>{culture || 'No information'}</span>
                </li>
            </ul>
        </>
    )
}
