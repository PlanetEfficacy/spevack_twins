class PhotoList extends React.Component {
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
    switch (this.props.config.smallPhotoType) {
      case 'year':
        this.photoYear(photo)
        break;
      case 'month':
        this.properMonth(photo.date)
        break;
      case 'day':
        photo.date
        break;
    }
  }

  clickHandler(photo) {
    switch (this.props.config.smallPhotoType) {
      case 'year':
        console.log('assigning year click handler')
        this.props.config.handleClick(this.photoYear(photo))
        break;
      case 'month':
        console.log('assigning month click handler')
        this.props.config.handleClick(this.photoYear(photo), this.photoMonth(photo))
        break;
      case 'day':
        console.log('assigning day click handler')
        this.props.config.handleClick(photo)
        break;
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
