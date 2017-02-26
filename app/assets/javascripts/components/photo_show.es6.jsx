class PhotoShow extends React.Component {
  handleNewComment (comment) {
    this.props.handleNewComment(comment)
  }

  render () {
    let photo = this.props.currentPhoto;

    return (
      <div>
        <MainPhoto  photo={ photo } />
        <NavigationButtons forward={ this.props.forward } back={ this.props.back } />
        <CommentList comments={ this.props.comments }
                     user={ this.props.user }
                     photo={ photo }
                     handleNewComment={ this.handleNewComment.bind(this) }/>
        <BigButton  icon="favorite"/>
      </div>
    )
  }
}
