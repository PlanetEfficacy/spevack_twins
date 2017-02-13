class PhotoList extends React.Component {
  constructor(props) {
    super(props)
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
    return this.props.photos.map((photo) => {
      return (
        <SmallPhoto key={photo.id}
                    photo={photo}
                    date={ this.properMonth(photo.date) } />
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
