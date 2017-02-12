class SmallPhoto extends React.Component {
  smallPhotoStyle(imageUrl) {
    return {
      backgroundImage: 'url(' + imageUrl + ')'
    }
  }

  handleClick(e) {
    this.props.handleClick(this.props.photo.date)
  }

  render () {
    return (
      <a href="#" onClick={this.handleClick.bind(this)}>
        <div className="small-image-card z-depth-2" style={this.smallPhotoStyle(this.props.photo.image.url)}>
          <span><h5 className="white-text small-photo-date">{this.props.date}</h5></span>
        </div>
      </a>
    )
  }
}
