import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const ItemDetailsHeader = styled.h4 `
    margin-bottom: 20px;
    text-align: center;
`;

const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
                    <span className="term">{label}</span>
                    <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {
    gotService = new gotService();
	state = {
        loading: true,
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.itemId !== this.props.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if(!itemId) {
            return;
        }
        this.setState({
            loading: true
        })
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                })
            })
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading: false,
            error: false
        })
    }
    
    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <SelectError className="select-error">Please select an item from the list</SelectError>
        }
        

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {item} = this.state;
        const {name} = item;
        return (
            <ItemDetailsBlock className="rounded">
                <ItemDetailsHeader>{name}</ItemDetailsHeader>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
            </ItemDetailsBlock>
        );
    }
}