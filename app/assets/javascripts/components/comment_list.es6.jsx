class CommentList extends React.Component {

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

  render () {

    return (
      <div className="main-photo row">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            <NewCommentBox
              handleNewComment={ this.handleNewComment.bind(this) }
              photo={this.props.photo }
              user={this.props.user}
            />
            { this.renderComments() }
          </div>
        </div>
      </div>
    );
  }
}
