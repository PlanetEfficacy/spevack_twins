class BigButton extends React.Component {
  render () {
    return (
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large red">
          <i className="large material-icons">{ this.props.icon }</i>
        </a>
      </div>
    )
  }
}
