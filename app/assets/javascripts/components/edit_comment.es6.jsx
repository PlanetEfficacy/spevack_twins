class EditComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      body: '',
      updateDisabled: false
    }

    this.handleCommentChange = this.handleCommentChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      active: true,
      updateEnabled: true,
      body: this.props.comment.body
    })
  }

  handleCommentChange(e) {
    const body = e.target.value
    const updateDisabled = body === ''
    this.setState({ body: body, updateDisabled: updateDisabled })
  }

  render () {
    const comment = this.props.comment;
    const buttonClass = "waves-effect waves-yellow-accent-4 btn-flat";

    return (
      <div>
        <div className="col s9">
          <textarea
            className="materialize-textarea"
            onChange={ this.handleCommentChange }
            value={ this.state.body }
          />
        </div>
        <div className="col s5 push-s7 bottom-margin-25 ">
          <a
            className={ buttonClass }
            href="#"
            onClick={ this.props.handleDeactiveateEditComment }
          >
            Cancel
          </a>
          <button
            className={`${buttonClass} ${ this.state.updateDisabled && "disabled" }`}
            disabled={ this.state.updateDisabled }
            onClick={ (e) => this.props.handleUpdateComment(this.state.body) }
          >
            Update
          </button>
        </div>
      </div>
    )
  }
}
