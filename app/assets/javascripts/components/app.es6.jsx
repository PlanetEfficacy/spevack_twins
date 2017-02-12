class App extends React.Component {
  render () {
    if (this.props && this.props.photos) {
      return (
        <div>Hello World</div>
      )
    } else {
      return <Show />;
    }
  }
}
