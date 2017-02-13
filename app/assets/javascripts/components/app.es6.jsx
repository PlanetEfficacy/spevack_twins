class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPhotos: [],
      photo: {},
      componentName: "PhotoShow",
      photoIndex: 0,
      filteredPhotos: []

    }
  }

  componentDidMount() {
    const firstPhoto = 0;
    this.getPhotos(firstPhoto)
  }

  getPhotos(index) {
    $.getJSON('/api/v1/photos.json', (response) => {
      this.setState({ allPhotos: response,
                      photo: response[index],
                      photoIndex: index })
    });
  }

  decrementPhotoIndex() {
    if(this.state.photoIndex > 0) {
      const index = this.state.photoIndex - 1;
      this.setState({ photoIndex: index, photo: this.state.allPhotos[index]})
    }
  }

  incrementPhotoIndex() {
    if(this.state.photoIndex < this.state.allPhotos.length) {
      const index = this.state.photoIndex + 1;
      this.setState({ photoIndex: index, photo: this.state.allPhotos[index]})
    }
  }

  handleBrowse() {
    
  }


  render () {
    if (this.state.componentName === "PhotoList") {
      return (
        <PhotoList photos={this.state.photos} />
      )
    }
    if (this.state.componentName === "PhotoShow") {
      return (
        <div>
          <NavigationHeader user={this.props.user}
                            handleBrowse={this.handleBrowse.bind(this)}/>
          <PhotoShow  photos={this.state.allPhotos}
                      photoIndex={this.state.photoIndex}
                      currentPhoto={this.state.photo}
                      forward={this.decrementPhotoIndex.bind(this)}
                      back={this.incrementPhotoIndex.bind(this)}/>
        </div>
      )
    }
  }
}
