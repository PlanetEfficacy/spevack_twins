class CommentList extends React.Component {

  handleNewComment (comment) {
    this.props.handleNewComment(comment)
  }

  renderComments () {
    const comments = this.props.comments || [];
    return comments.map((comment) => {
      return (
        <Comment comment={comment} />
      );
    })
  }

  render () {



    return (
      <div className="main-photo row">
        <div className="col s12 m6 offset-m3">
          <div className="card">
            <NewCommentBox user={this.props.user}
                           photo={this.props.photo }
                           handleNewComment={ this.handleNewComment.bind(this) }/>
            { this.renderComments() }
          </div>
        </div>
      </div>
    );
  }
}
