import React from 'react';
import {Pagination} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class MangaReaderPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {activePage: 1,
			manga : this.props.match.params.manga,
			volume : this.props.match.params.volume,
			page : this.props.match.params.page,
			pageCount : 100,
			volumeCount : 1
		};
		this.incrementPage = this.incrementPage.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

    componentDidMount() {
		this.props.mangaData.forEach((value) => {
			// Search the dictionary for the correct entry
			if(value.name == this.state.manga)
			{
				this.setState({pageCount : value.volumePageCountList[value.volumeCount-1]});
				this.setState({volumeCount : value.volumeCount});	
			}
		});
    }

    handleKeyPress = (event) => {
      if((event.key == 37) && (this.state.page > 1)){
        this.incrementPage();
      }
      if((event.key == 39) && (this.state.page < this.state.pageCount)){
        this.handleSelect((parseInt(this.state.page, 10)-1));
      }
    }

	getInitialState() {
		return {
		  activePage: this.state.page
		};
	}

	handleSelect(eventKey) {
		this.setState({
		  page: eventKey
		}, () => {
            this.nextPage();
        });
	}

	incrementPage(){
		var nextPage = (parseInt(this.state.page, 10) + 1);
		this.setState({page : nextPage}, () => {
            this.nextPage();
        });
	}

	nextPage(){
		this.props.history.push("/mangareader/"+ this.state.manga +"/"+ this.state.volume +"/"+ this.state.page);
	}

	render(){
		return(
			<div id="textAlignCenter" onKeyPress={this.handleKeyPress}>
		      <Pagination id="mangaPageDiv"
		        prev
		        next
		        first
		        last
		        ellipsis
		        boundaryLinks
		        items={this.state.pageCount}
		        maxButtons={7}
		        activePage={parseInt(this.state.page, 10)}
		        onSelect={this.handleSelect} />
		        <div onClick={this.incrementPage}>
		       		<MangaSinglePage manga={this.state.manga} volume={this.state.volume} page={this.state.page}/>
		       	</div>
			</div>
		);
	}
}

class MangaSinglePage extends React.Component{
	render() {
		return(
			<img id="mangaPage" src={require("./../assets/manga/" + this.props.manga + "/volume"+ this.props.volume + "/y (" + this.props.page + ").jpg")}/>
		);
	}
}