class PhotoList extends React.Component {
  constructor() {
    super()
    // this.state = { photos: this.props.photos }
    // console.log(this.props.photos[0])
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

  getPhotoShow(id) {
    window.location = '/photos/' + id;
  }

  photos() {
    let storedPhotos = this.state ? this.state.photos : this.props.photos
    return storedPhotos.map((photo) => {
      return (
        <SmallPhoto key={photo.id}
                    photo={photo}
                    date={ this.state ? photo.date : this.properMonth(photo.date) }
                    handleClick={ this.state ? this.getPhotoShow(photo.id) : this.getPhotosForMonth.bind(this)}/>
      );
    })
  }

  render () {
    return (
      <div className="container">
        <h4 className="center-align">Select Month</h4>
        {this.photos()}
      </div>
    )
  }
}
