class SmallPhoto extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.photo)
  }

  smallPhotoStyle() {
    const photo = this.props.photo
    const imageUrl = photo.image.thumb ? photo.image.thumb.url : photo.image.url 
    return {
      backgroundImage: 'url(' + imageUrl + ')'
    }
  }

  render () {
    return (
      <a href="#" onClick={ this.handleClick }>
        <div 
          className="small-image-card z-depth-2"
          style={ this.smallPhotoStyle() }
        >
          <span>
            <h5 className="white-text small-photo-date">
              { this.props.date }
            </h5>
          </span>
        </div>
      </a>
    )
  }
}
