import React, {Component} from 'react';
import './itemList.css';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemListBlock = styled.ul`
	cursor: pointer;
`;

const ListGroupItem = styled.li`
	cursor: pointer;
`;

export default class ItemList extends Component {
	gotService = new gotService();
	state = {
		charList: null,
		error: false
	}

	componentDidMount() {
		this.gotService.getAllCharacters()
			.then((charList) => {
				this.setState({
					charList
				})
			})
	}

	componentDidCatch() {
        this.setState({
            error: true
        })
    }

	renderItems(arr) {
		return arr.map((item, i)=> {
			return (
				<ListGroupItem 
				key = {item.id}
				className="list-group-item"
				onClick={() => this.props.onCharSelected(item.id)}>
				{item.name}
				</ListGroupItem>
			)
		})
	}

	render() {

		const {charList} = this.state; 

		if (!charList) {
			return <Spinner/>
		}
		if(this.state.error) {
            return <ErrorMessage/>
        }

		const items = this.renderItems(charList);

		return (
			<ItemListBlock>
				{items}
			</ItemListBlock>
		);
	}
}