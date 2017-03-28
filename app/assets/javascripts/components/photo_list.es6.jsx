class PhotoList extends React.Component {
  constructor(props) {
    super(props)

    this.clickHandler = this.clickHandler.bind(this);

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
    console.log("CLICK")
    switch (this.props.config.smallPhotoType) {
      case 'year':
        this.props.config.handleClick(this.photoYear(photo))
        break;
      case 'month':
        this.props.config.handleClick(this.photoYear(photo), this.photoMonth(photo))
        break;
      case 'day':
        this.props.config.handleClick(photo)
        break;
    }
  }

  render () {
    return (
      <div className="container">
        <h4 className="center-align">{ this.props.config.listHeader }</h4>
        { this.props.photos.map((photo) => {
            return (
              <SmallPhoto 
                date={ this.smallPhotoDate(photo) }
                handleClick={ this.clickHandler }
                key={ photo.id }
                photo={ photo }
              />
            );
        }.bind(this)) }
      </div>
    )
  }
}
