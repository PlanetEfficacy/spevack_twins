class MainPhoto extends React.Component {
  componentDidMount() {
    $('.materialboxed').materialbox();
  }

  render () {
    return (
      <div className="card">
        <div className="card-image">
          <img className="materialboxed"
               src={ this.props.image }/>
               <span className="card-title">{ this.props.title }</span>
        </div>
        <div className="card-content">
          <p>{ this.props.caption }</p>
          <p>{ this.props.date }</p>
        </div>
      </div>
    )
  }
}
