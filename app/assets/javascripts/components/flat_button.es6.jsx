class FlatButton extends React.Component {
  render () {
    return (
      <a onClick={this.props.handleClick}
         className="waves-effect waves-light btn-large">
        <i className="material-icons left">{ this.props.icon }</i>
        { this.props.text }
      </a>
    );
  }
}
