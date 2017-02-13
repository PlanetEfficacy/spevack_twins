class PhotoShow extends React.Component {

  render () {
    let photo = this.props.currentPhoto;

    return (
      <div>
        <div className="main-photo row">
          <div className="col s12 m6 offset-m3">
            <MainPhoto  title={photo.title}
                        caption={photo.caption}
                        date={photo.date}
                        image={photo.image && photo.image.url}/>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3 s12">
            <div className="left">
              <FlatButton text=""
                          icon="arrow_back"
                          handleClick={this.props.forward}/>
            </div>
            <div className="right">
              <FlatButton text=""
                          icon="arrow_forward"
                          handleClick={this.props.back}/>
            </div>
          </div>
        </div>
        <BigButton  icon="favorite"/>
      </div>
    )
  }
}
