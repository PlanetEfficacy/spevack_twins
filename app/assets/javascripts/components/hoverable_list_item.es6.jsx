class HoverableListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hovered: false
    }

    this.handleHoverOn = this.handlHoverOn.bind(this)
    this.handleHoverOff = this.handlHoverOff.bind(this)
  }

  handlHoverOff () {
    this.setState({ hovered: false })
  }

  handlHoverOn () {
    this.setState({ hovered: true })
  }

  render () {
    const text = this.props.text;

    return (
      <li
        onMouseOver={ this.handleHoverOn }
        onMouseOut={ this.handleHoverOff }
        className={ this.state.hovered && "hovered" }
      >
        <a href="#!" onClick={ this.props.handleClick }>
          { text }
        </a>
      </li>
    );
  }
}
