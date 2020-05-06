import React, {Component} from 'react';
import './itemList.css';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const ItemListBlock = styled.ul`
	cursor: pointer;
`;

const ListGroupItem = styled.li`
	cursor: pointer;
`;

export default class ItemList extends Component {
	state = {
		itemList: null,
		error: false
	}

	componentDidMount() {
		const {getData} = this.props;


		getData()
			.then((itemList) => {
				this.setState({
					itemList
				})
			})
	}

	componentDidCatch() {
        this.setState({
            error: true
        })
    }

	renderItems(arr) {
		return arr.map((item)=> {
			const {id} = item;
			const label = this.props.renderItem(item);
			return (
				<ListGroupItem 
				key = {id}
				className="list-group-item"
				onClick={() => this.props.onItemSelected(id)}>
				{label}
				</ListGroupItem>
			)
		})
	}

	render() {
		const {itemList} = this.state; 

		if (!itemList) {
			return <Spinner/>
		}
		if(this.state.error) {
            return <ErrorMessage/>
        }

		const items = this.renderItems(itemList);

		return (
			<ItemListBlock>
				{items}
			</ItemListBlock>
		);
	}
}