import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';


const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const CharDetailsHeader = styled.h4 `
    margin-bottom: 20px;
    text-align: center;
`;

const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

export default class CharDetails extends Component {
    gotService = new gotService();
	state = {
		char: null
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.charId !== this.props.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
            // this.foo.bar = 0;
    }
    
    render() {

        if(!this.state.char) {
            return <SelectError className="select-error">Please select a character</SelectError>
        }
        const {name, gender, born, died, culture} = this.state.char;
        const msg = 'No information';
        return (
            <CharDetailsBlock className="rounded">
                <CharDetailsHeader>{name || msg}</CharDetailsHeader>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender || msg}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born || msg}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died || msg}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture || msg}</span>
                    </li>
                </ul>
            </CharDetailsBlock>
        );
    }
}