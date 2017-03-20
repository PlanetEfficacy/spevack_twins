class ShowComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCommentActive: false,
      showMoreMenu: false,
      hoverEdit: false,
      hoverDelete: false,
    }

    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.showMoreMenu = this.showMoreMenu.bind(this);
    this.toggleMoreComment = this.toggleMoreComment.bind(this);
  }

  handleDeleteComment() {
    this.props.handleDeleteComment(this.props.comment)
  }

  toggleMoreComment(e) {
    e.preventDefault();
    this.setState({ showMoreMenu: !this.state.showMoreMenu })
  }

  showMoreMenu() {
    if (this.props.currentUser.id === this.props.comment.user.id) {
      return (
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
      )
    }
  }

  render () {
    const comment = this.props.comment;
    const username = comment.user.name;
    return (
      <div>
        <div className="col s9">
          <p className="username">{ username }
            <small className="grey-text">{ comment.created_at } ago</small>
          </p>
          <p>{ comment.body }</p>
          <a href="#" onClick={ this.props.activateReplyComment }>Reply</a>
        </div>
        { this.showMoreMenu() }
      </div>
    )
  }
}
