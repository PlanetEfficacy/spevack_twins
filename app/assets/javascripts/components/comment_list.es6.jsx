class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.handleNewComment = this.handleNewComment.bind(this)
  }

  handleNewComment (comment) {
    this.props.handleNewComment(comment)
  }

  renderComments () {
    const comments = this.props.comments || [];
    return comments.map((comment) => {
      return (
        <Comment
          comment={ comment }
          currentUser={ this.props.currentUser }
          handleDeleteComment={ this.props.handleDeleteComment }
          handleEditComment={ this.props.handleEditComment }
          handleNewComment={ this.handleNewComment }
          key={ comment.id }
        />
      );
    })
  }

  renderNewCommentBox () {
    if(!this.props.subCommentList){
      return (
        <NewCommentBox
          commentable={ this.props.commentable }
          currentUser={ this.props.currentUser }
          handleNewComment={ this.handleNewComment }
          path={ 'photos' }
        />
      )
    }
  }

  render () {
    const listClassName = !this.props.subCommentList ? "col s12 m6 offset-m3"
                            : "col s11 offset-s1";
    const cardClassName = !this.props.subCommentList && "card";
    return (
      <div className="main-photo row">
        <div className={ listClassName }>
          <div className={ cardClassName }>
            { this.renderNewCommentBox() }
            { this.renderComments() }
          </div>
        </div>
      </div>
    );
  }
}
