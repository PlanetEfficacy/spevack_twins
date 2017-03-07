class NavigationButtons extends React.Component {
  render () {
    return (
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
    );
  }
}
