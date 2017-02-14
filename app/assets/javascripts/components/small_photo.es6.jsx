class SmallPhoto extends React.Component {
  constructor() {
    super();
    this. _handleClick = this. _handleClick.bind(this);
  }

  _handleClick() {
    console.log('Small photo clicked!')
    this.props.handleClick(this.props.photo)
  }

  smallPhotoStyle(imageUrl) {
    return {
      backgroundImage: 'url(' + imageUrl + ')'
    }
  }

  render () {
    console.log("SmallPhoto.render() has just been invoked!")
    return (
      <a href="#" onClick={ this._handleClick }>
        <div  className="small-image-card z-depth-2"
              style={ this.smallPhotoStyle(this.props.photo.image.url) }>
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
