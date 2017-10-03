import React from "react";
import ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import { Pagination } from "react-bootstrap";
import Popover from "material-ui/Popover";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

export default class MangaReaderPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePage: 1,
			manga: this.props.match.params.manga,
			volume: this.props.match.params.volume,
			page: this.props.match.params.page,
			pageCount: 100,
			volumeCount: 1
		};
		this.incrementPage = this.incrementPage.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}

	componentDidMount() {
		this.props.mangaData.forEach(value => {
			// Search the dictionary for the correct entry
			if (value.name === this.state.manga) {
				this.setState({
					pageCount: value.volumePageCountList[value.volumeCount - 1]
				});
				this.setState({ volumeCount: value.volumeCount });
			}
		});
	}

	getInitialState() {
		return {
			activePage: this.state.page
		};
	}

	handleSelect(eventKey) {
		this.setState(
			{
				page: eventKey
			},
			() => {
				this.nextPage();
			}
		);
	}

	incrementPage() {
		var nextPage = parseInt(this.state.page, 10) + 1;
		if (nextPage <= this.state.pageCount) {
			this.setState({ page: nextPage }, () => {
				this.nextPage();
			});
		}
	}

	nextPage() {
		this.props.history.push(
			"/mangareader/" +
				this.state.manga +
				"/" +
				this.state.volume +
				"/" +
				this.state.page
		);
	}

	render() {
		return (
			<div id="textAlignCenter">
				<Pagination
					id="mangaPageDiv"
					prev
					next
					first
					last
					ellipsis
					boundaryLinks
					items={this.state.pageCount}
					maxButtons={7}
					activePage={parseInt(this.state.page, 10)}
					onSelect={this.handleSelect}
				/>
				<div>
					<MangaSinglePage
						manga={this.state.manga}
						volume={this.state.volume}
						page={this.state.page}
						parentClick={this.incrementPage}
					/>
				</div>
			</div>
		);
	}
}

class MangaSinglePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageStatus: "loading",
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0,
			imgXOffset: 0,
			imgYOffset: 0,
			width: 0,
			height: 0,
			cropping: false,
			cropConfirmDialogue: false
		};
	}

	componentDidMount() {
		var node = ReactDOM.findDOMNode(this);
		const rect = node.getBoundingClientRect();
		const docEl = document.documentElement;
		const rectTop = rect.top + window.pageYOffset - docEl.clientTop;
		const rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;

		this.setState({
			imgXOffset: rectTop,
			imgYOffset: rectLeft,
			anchorEl: findDOMNode(this.crop)
		});
	}

	changeLoading() {
		this.setState({ imageStatus: "loading" });
		document.getElementById("overlay").style.display = "block";
	}

	handleImageLoaded() {
		this.setState({ imageStatus: "loaded" });
		document.getElementById("overlay").style.display = "none";
	}

	handleImageErrored() {
		this.setState({ imageStatus: "failed to load" });
	}

	ondragstart(e) {
		this.setState({
			x1: e.pageX,
			y1: e.pageY,
			cropping: true
		});
		document.getElementById("imageCropping").style.display = "block";
	}

	onclick(e) {
		console.log(e.pageX);
		if (this.state.cropping) {
			if (
				e.pageX < this.state.x1 ||
				e.pageX > this.state.x2 ||
				(e.pageY < this.state.y1 || e.pageY > this.state.y2)
			) {
				this.setState({
					cropping: false,
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 0,
					width: 0,
					height: 0,
					cropConfirmDialogue: false
				});
				document.getElementById("imageCropping").style.display = "none";
				document.getElementById("cropConfirmation").style.display =
					"none";
			}
		} else {
			this.changeLoading();
			this.props.parentClick();
		}
	}

	cancelCrop() {
		this.setState({
			cropping: false,
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0,
			width: 0,
			height: 0,
			cropConfirmDialogue: false
		});
		document.getElementById("imageCropping").style.display = "none";
		document.getElementById("cropConfirmation").style.display = "none";
	}

	ondragend(e) {
		e.preventDefault();
		this.setState({
			x2: e.pageX,
			y2: e.pageY,
			height: e.pageY - this.state.y1,
			width: e.pageX - this.state.x1
		});
	}

	ondragenddone(e) {
		this.setState({
			x2: e.pageX,
			y2: e.pageY,
			cropConfirmDialogue: true
		});
		document.getElementById("cropConfirmation").style.display = "block";
	}

	render() {
		return (
			<div>
				<div id="overlay">
					<div id="text">Loading</div>
				</div>
				<div
					id="imageCropping"
					style={{
						height: this.state.height,
						width: this.state.width,
						left: this.state.x1,
						top: this.state.y1
					}}
					ref={node => {
						this.crop = node;
					}}
				>
					{" "}
				</div>
				<div
					id="cropConfirmation"
					style={{
						left: this.state.x2 - 100,
						top: this.state.y2
					}}
				>
					<Button color="primary">Create Card</Button>
					<Button onClick={this.cancelCrop.bind(this)} color="accent">
						Cancel
					</Button>
				</div>

				<img
					id={this.state.imageStatus}
					alt=""
					onDragStart={this.ondragstart.bind(this)}
					onDrag={this.ondragend.bind(this)}
					onDragEnd={this.ondragenddone.bind(this)}
					onLoad={this.handleImageLoaded.bind(this)}
					onError={this.handleImageErrored.bind(this)}
					onClick={this.onclick.bind(this)}
					src={require("./../assets/manga/" +
						this.props.manga +
						"/volume" +
						this.props.volume +
						"/y (" +
						this.props.page +
						").jpg")}
				/>
			</div>
		);
	}
}
