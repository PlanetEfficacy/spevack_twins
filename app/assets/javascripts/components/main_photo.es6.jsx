class MainPhoto extends React.Component {
  render () {
    return (
      <div className="card">
        <div className="card-image">
          <img className="materialboxed"
               data-caption={ this.props.caption }
               src={ this.props.image }/>
               <span className="card-title">{ this.props.title }</span>
        </div>
        <div className="card-content">
          <p>{ this.props.caption }</p>
        </div>
      </div>
    )
  }
}
