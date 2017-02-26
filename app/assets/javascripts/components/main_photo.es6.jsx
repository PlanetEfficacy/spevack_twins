class MainPhoto extends React.Component {
  componentDidMount() {
    $('.materialboxed').materialbox();
  }

  render () {
    const photo = this.props.photo;
    return (
      <div className="main-photo row">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            <div className="card-image">
              <img className="materialboxed"
                   src={ photo.image && photo.image.url }/>
              <span className="card-title">{ photo.title }</span>
            </div>
            <div className="card-content">
              <p>{ photo.caption }</p>
              <p>{ photo.date }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
