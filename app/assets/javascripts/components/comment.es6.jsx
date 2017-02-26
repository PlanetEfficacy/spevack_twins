class Comment extends React.Component {
  render () {
    return (
      <div>
        {this.props.comment.body}
      </div>
    );
  }
}
