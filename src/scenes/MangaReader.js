import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default class MangaReader extends React.Component {
	constructor(props) {
		super(props);
		this.openManga = this.openManga.bind(this);
	}
	openManga(mangaName){
		
	}
    render() {
        return (
            <div id="mangaSelection">
              <Carousel>
              	{this.props.store.data.mangaDb.map((manga, index) => (
				    <Carousel.Item key={index}>
				      <Link to={{
						  pathname: "/mangareader/"+ manga.name +"/1/1" ,
						  state: { mangaPage: manga.name }
						}} replace>
				      	<img onClick={this.openManga.bind(this,manga.name)} width={540} height={650} alt="900x500" src={require("./../assets/manga/" + manga.name + "/" + manga.name + ".jpg")}/>
				      </Link>
				    </Carousel.Item>
			    ))}
			  </Carousel>
            </div>
        );
    }
}
