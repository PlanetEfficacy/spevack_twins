class Show extends React.Component {
  constructor() {
    super()
    this.state = { photos: [], photoIndex: 0, currentPhoto: "" }
  }

  componentDidMount(){
    $.getJSON('/api/v1/photos.json', (response) => {
      this.setState({ photos: response, currentPhoto: response[0] })
    });
  }

  decrementCurrentPhoto(){
    if(this.state.photoIndex < this.state.photos.length) {
      const index = this.state.photoIndex + 1;
      this.setState({ photoIndex: index, currentPhoto: this.state.photos[index] })
    }
  }

  incrementCurrentPhoto(){
    if(this.state.photoIndex > 0) {
      const index = this.state.photoIndex - 1;
      this.setState({ photoIndex: index, currentPhoto: this.state.photos[index] })
    }
  }

  render () {
    let photo = this.state.currentPhoto;
    return (
      <div>
        <div className="main-photo row">
          <div className="col s12 m6 offset-m3">
            <MainPhoto  title={photo.title}
                        caption={photo.caption}
                        date={photo.date}
                        image={photo.image && photo.image.url}/>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3 s12">
            <div className="left">
              <FlatButton text=""
                          icon="arrow_back"
                          handleClick={this.incrementCurrentPhoto.bind(this)}/>
            </div>
            <div className="right">
              <FlatButton text=""
                          icon="arrow_forward"
                          handleClick={this.decrementCurrentPhoto.bind(this)}/>
            </div>
          </div>
        </div>
        <BigButton  icon="favorite"/>
      </div>
    )
  }
}
