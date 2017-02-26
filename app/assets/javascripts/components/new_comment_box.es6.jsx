class NewCommentBox extends React.Component {
  constructor() {
    super()
    this.state = {
      newCommentActive: false,
      comment: ''
    }
  }

  postComment () {
    $.ajax({
      type: "POST",
      url: `api/v1/photos/${this.props.photo.id}/comments`,
      data: { comment: { body: this.state.comment }  },
      success: this.handleNewComment.bind(this),
      // dataType: dataType
    });
  }

  cancelComment () {
    console.log("cancelling comment")
  }

  handleNewComment(comment) {
    this.props.handleNewComment(comment)
  }

  showButtons () {
    this.setState({ newCommentActive: true })
  }

  commentButtons () {
    if (this.state.newCommentActive) {
      return (
        <div className="col s5 push-s7 bottom-margin-25 ">
          <button onClick={ this.cancelComment.bind(this) } className="waves-effect waves-yellow-accent-4 btn-flat">Cancel</button>
          <button onClick={ this.postComment.bind(this) } className="waves-effect waves-yellow-accent-4 btn-flat">Comment</button>
        </div>
      )
    }
  }

  updateCommentValue (e) {
    this.setState({ comment: e.target.value })
  }

  render () {
    return (
      <div>
        <div className="row">
          <div className="col m2">
            <img src={this.props.user.image} className="account-img z-depth-1"/>
          </div>
          <div className="col m10">
            <textarea className="materialize-textarea"
                      value={ this.state.comment }
                      onFocus={ this.showButtons.bind(this) }
                      onChange={ this.updateCommentValue.bind(this) } />
          </div>
        </div>
        <div className="row">
          { this.commentButtons() }
        </div>
      </div>
    );
  }
}
