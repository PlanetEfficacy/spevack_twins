class PhotoShow extends React.Component {
  render () {
    const photo = this.props.currentPhoto;
    return (
      <div>
        <NavigationButtons 
          back={ this.props.back } 
          forward={ this.props.forward } 
        />
        <MainPhoto 
          photo={ photo } 
        />
        <CommentList
          commentable={ photo }
          comments={ this.props.comments }
          currentUser={ this.props.currentUser }
          handleDeleteComment={ this.props.handleDeleteComment }
          handleEditComment={ this.props.handleEditComment }
          handleNewComment={ this.props.handleNewComment }
        />
        <BigButton 
          icon="favorite"
        />
      </div>
    )
  }
}
