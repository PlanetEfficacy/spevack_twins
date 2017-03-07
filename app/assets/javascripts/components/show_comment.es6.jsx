class ShowComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCommentActive: false,
      showMoreMenue: false,
      hoverEdit: false,
      hoverDelete: false,
    }

    this.toggleMoreComment = this.toggleMoreComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  handleDeleteComment() {
    this.props.handleDeleteComment(this.props.comment)
  }

  toggleMoreComment(e) {
    e.preventDefault();
    this.setState({ showMoreMenu: !this.state.showMoreMenu })
  }

  render () {
    const comment = this.props.comment;
    const username = comment.user.name;

    return (
      <div>
        <div className="col s9">
          <p className="username">{ username }</p>
          <p>{ comment.body }</p>
          <a href="#" onClick={ this.props.activateReplyComment }>Reply</a>
        </div>
        <div className="col s1">
          <a href="#!" onClick={ this.toggleMoreComment }>
            <i className="material-icons black-text">more_vert</i>
          </a>
          {
            this.state.showMoreMenu
            &&
            <div className="more-comment z-depth-2">
              <ul className="more-menu-ul">
                <HoverableListItem
                  text="Edit"
                  handleClick={ this.props.handleActivateEditComment }
                />
                <HoverableListItem
                  text="Delete"
                  handleClick={ this.handleDeleteComment }
                />
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}
