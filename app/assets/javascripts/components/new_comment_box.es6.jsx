class NewCommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCommentActive: false,
      comment: ''
    }

    this.updateCommentValue = this.updateCommentValue.bind(this)
  }

  postComment (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: `api/v1/photos/${this.props.photo.id}/comments`,
      data: { comment: { body: this.state.comment }  },
      success: this.handleNewComment.bind(this),
    });
  }

  cancelComment (e) {
    e.preventDefault();
    this.setState({ comment: '', newCommentActive: false })
    this.props.replyComment && this.props.handleDeactivateComment()
  }

  handleNewComment(comment) {
    this.setState({ comment: '', newCommentActive: false })
    this.props.handleNewComment(comment)
  }

  showButtons () {
    this.setState({ newCommentActive: true })
  }

  commentButtons () {
    if (this.state.newCommentActive) {
      const buttonClass = 'waves-effect waves-yellow-accent-4 btn-flat'

      return (
        <div className='col s5 push-s7 bottom-margin-25'>
          <a
            className={ buttonClass }
            href='!#'
            onClick={ this.cancelComment.bind(this) }
          >
            Cancel
          </a>
          <button
            className={`${buttonClass} ${ this.state.comment === '' && 'disabled' }`}
            disabled={ this.state.comment === '' }
            onClick={ this.postComment.bind(this) }
          >
            Comment
          </button>
        </div>
      )
    }
  }

  updateCommentValue (e) {
    this.setState({ comment: e.target.value })
  }

  render () {
    return (
      <div className='hoverable'>
        <div className='row'>
          <div className='col m2'>
            <img src={this.props.user.image} className='account-img'/>
          </div>
          <div className='col m10'>
            <textarea className='materialize-textarea'
                      value={ this.state.comment }
                      onFocus={ this.showButtons.bind(this) }
                      onChange={ this.updateCommentValue } />
          </div>
        </div>
        <div className='row'>
          { this.commentButtons() }
        </div>
      </div>
    );
  }
}
