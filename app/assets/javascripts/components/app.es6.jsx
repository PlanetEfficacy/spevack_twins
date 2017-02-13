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
    $.getJSON('/api/v1/photos/one-per-year', (response) => {
      this.setState({ filteredPhotos: response, componentName: "PhotoYearList"})
    })
  }

  handleYearClick() {
    // $.getJSON('/api/v1/photos/one-per-year', (response) => {
    //   debugger
    //   this.setState({ filteredPhotos: response, componentName: "PhotoYearList"})
    // })
  }

  render () {
    if (this.state.componentName === "PhotoYearList") {
      return (
        <PhotoList photos={this.state.filteredPhotos}
                   handleClick={this.handleYearClick}/>
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
