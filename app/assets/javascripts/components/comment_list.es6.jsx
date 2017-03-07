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
          key={ comment.id }
          user={ this.props.user }
          handleDeleteComment={ this.props.handleDeleteComment }
          handleEditComment={ this.props.handleEditComment }
        />
      );
    })
  }

  renderNewCommentBox () {
    if(!this.props.subCommentList){
      return (
        <NewCommentBox
          handleNewComment={ this.handleNewComment }
          photo={this.props.photo }
          user={this.props.user}
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
