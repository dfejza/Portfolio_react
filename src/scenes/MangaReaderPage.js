import React from 'react';
import {Pagination} from 'react-bootstrap';

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
	}

    componentDidMount() {
		this.props.mangaData.forEach((value) => {
			// Search the dictionary for the correct entry
			if(value.name === this.state.manga)
			{
				this.setState({pageCount : value.volumePageCountList[value.volumeCount-1]});
				this.setState({volumeCount : value.volumeCount});	
			}
		});
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
		if(nextPage <= this.state.pageCount)
		{
			this.setState({page : nextPage}, () => {
	            this.nextPage();
	        });
		}
	}

	nextPage(){
		this.props.history.push("/mangareader/"+ this.state.manga +"/"+ this.state.volume +"/"+ this.state.page);
	}

	render(){
		return(
			<div id="textAlignCenter">
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
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }
 
  changeLoading(){
  	this.setState({ imageStatus: 'loading' });
  	document.getElementById("overlay").style.display = "block";
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
    document.getElementById("overlay").style.display = "none";
  }
 
  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' });
  }
	render() {
		return(
			<div>
				<div id="overlay">
				  <div id="text">Loading</div>
				</div>
				<img id={this.state.imageStatus} 
				  alt=""
		          onLoad={this.handleImageLoaded.bind(this)}
		          onError={this.handleImageErrored.bind(this)}
		          onClick={this.changeLoading.bind(this)}
	          	src={require("./../assets/manga/" + this.props.manga + "/volume"+ this.props.volume + "/y (" + this.props.page + ").jpg")}/>
	         </div>
		);
	}
}