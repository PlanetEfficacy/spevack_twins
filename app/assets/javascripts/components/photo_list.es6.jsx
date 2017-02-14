class PhotoList extends React.Component {
  constructor(props) {
    super(props)
    // this.state = { photos: this.props.photos }
    // console.log(this.props.photos[0])
  }

  componentDidMount() {
    console.log(`PhotoList has mounted ${this.props.photos.length} photos!`)
  }

  getPhotosForMonth(date) {
    const splitDate = date.split("-")
    const year = splitDate[0]
    const month = splitDate[1]
    $.getJSON(`/api/v1/photos?year=${year}&month=${month}`, (response) => {
      this.setState({ photos: response })
    });
  }

  properMonth(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    index = parseInt(date.split("-")[1]) - 1
    return months[index];
  }

  photoYear(photo) {
    return photo.date.split("-")[0]
  }

  photoMonth(photo) {
    return photo.date.split("-")[1]
  }

  getPhotoShow(id) {
    window.location = '/photos/' + id;
  }

  smallPhotoDate(photo) {
    if(this.props.config.smallPhotoType === "year") {
      return this.photoYear(photo)
    } else if (this.props.config.smallPhotoType === "month") {
      return this.properMonth(photo.date)
    } else if (this.props.config.smallPhotoType === "day") {
      return photo.date
    }
  }

  clickHandler(photo) {
    console.log("In photo list, handling small photo click")
    if(this.props.config.smallPhotoType === "year") {
      console.log('assigning year click handler')
      this.props.config.handleClick(this.photoYear(photo))
    } else if (this.props.config.smallPhotoType === "month") {
      console.log('assigning month click handler')
      this.props.config.handleClick(this.photoYear(photo), this.photoMonth(photo))
    } else if (this.props.config.smallPhotoType === "day") {
      console.log('assigning day click handler')
      this.props.config.handleClick(photo)
    }
  }

  render () {
    console.log("PhotoList.render() has just been invoked!")
    return (
      <div className="container">
        <h4 className="center-align">{ this.props.config.listHeader }</h4>
        { this.props.photos.map((photo) => {
            return (
              <SmallPhoto key={ photo.id }
                          photo={ photo }
                          date={ this.smallPhotoDate(photo) }
                          handleClick={ this.clickHandler.bind(this) } />
            );
        }.bind(this)) }
      </div>
    )
  }
}
