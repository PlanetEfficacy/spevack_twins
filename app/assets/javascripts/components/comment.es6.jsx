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
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
    this.newComment = this.newComment.bind(this);
    this.showComment = this.showComment.bind(this);
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

  handleNewComment(comment) {
    this.props.handleNewComment(comment);
    this.setState({ newCommentActive: false })
  }

  replyComments() {
    return (
      <CommentList
        commentable={ this.props.comment }
        comments={ this.props.comment.comments }
        handleDeleteComment={ this.props.handleDeleteComment }
        handleEditComment={ this.props.handleEditComment }
        handleNewComment={ this.props.handleNewComment }
        subCommentList={ true }
        currentUser={ this.props.currentUser }
      />
    )
  }
 
  newComment() {
    if (this.state.newCommentActive) {
      return (
        <div className="row">
          <div className="col s11 offset-s1">
            <NewCommentBox
              commentable={ this.props.comment }
              currentUser={ this.props.currentUser }
              handleDeactivateComment={ this.deactivateReplyComment }
              handleNewComment={ this.handleNewComment }
              path={ 'comments' }
            />
          </div>
        </div>
      );
    }
  }

  showComment() {
    if(this.state.activeEdit){
      return (
        <EditComment
          comment={ this.props.comment }
          handleDeactivateEdit={ this.handleDeactivateEdit }
          handleUpdateComment={ this.handleUpdateComment }
        />
      )
    } else {
      return (
        <ShowComment
          activateReplyComment={ this.activateReplyComment }
          currentUser={ this.props.currentUser }
          comment={ this.props.comment }
          handleDeleteComment={ this.props.handleDeleteComment }
          handleActivateEditComment={ this.handleActivateEditComment }
        />
      )
    }
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
          { this.showComment() }
        </div>
        { this.newComment() }
        { this.replyComments() }
      </div>
    );
  }
}
