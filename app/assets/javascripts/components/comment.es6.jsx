class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCommentActive: false,
      activeEdit: false
    }
    this.activateReplyComment = this.activateReplyComment.bind(this);
    this.deactivateReplyComment = this.deactivateReplyComment.bind(this);
    this.handleActivateEditComment = this.handleActivateEditComment.bind(this);
    this.handleDeactiveateEditComment = this.handleDeactiveateEditComment.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
  }

  activateReplyComment(e) {
    e.preventDefault();
    this.setState({ newCommentActive: true })
  }

  deactivateReplyComment() {
    this.setState({ newCommentActive: false })
  }

  handleActivateEditComment() {
    this.setState({ activeEdit: true })
  }

  handleDeactiveateEditComment() {
    this.setState({ activeEdit: false })
  }

  handleUpdateComment(body) {
    let comment = this.props.comment
    comment.body = body
    this.props.handleEditComment(comment)
    this.setState({ activeEdit: false })
  }

  replyComments() {
    const comments = this.props.comment.comments
    return comments.map((comment) => {
      return (
        <Comment
          comment={ commnet }
          key={ comment.id }
          user={ this.props.user }
        />
      )
    })
  }

  render () {
    const comment = this.props.comment;
    const userImage = comment.user.image;
    const username = comment.user.name;
    return (
      <div className="comment-row">
        <div className="row">
          <div className="col s2">
            <img
              alt={ username }
              src={ userImage }
              className="account-img" />
          </div>
          {
            this.state.activeEdit
            ?
            <EditComment
              comment={ comment }
              handleDeactivateEdit={ this.handleDeactivateEdit }
              handleUpdateComment={ this.handleUpdateComment }
            />
            :
            <ShowComment
              activateReplyComment={ this.activateReplyComment }
              comment={ comment }
              handleDeleteComment={ this.props.handleDeleteComment }
              handleActivateEditComment={ this.handleActivateEditComment }
            />
          }
        </div>
        {
          this.state.newCommentActive
          &&
          <div className="row">
            <div className="col s11 offset-s1">
              <NewCommentBox
                comment={ comment }
                handleDeactivateComment={ this.deactivateReplyComment }
                replyComment={ true }
                user={ this.props.comment.user } />
            </div>
          </div>
        }
        { this.replyComments() }
      </div>
    );
  }
}
