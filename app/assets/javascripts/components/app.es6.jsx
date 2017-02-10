class App extends React.Component {
  constructor() {
    super()
    this.state = { photos: [] }
  }

  componentDidMount(){
    const photos = JSON.parse(localStorage.getItem('ideas')) || []
    this.setState({ ideas: ideas, allIdeas: ideas})
  }

  render () {
    return (
      <div>
        <div className="main-photo row">
          <div className="col s12 m6 offset-m3">
            <MainPhoto  title="My great title"
                        caption="My incredible caption."
                        image="https://storage.googleapis.com/photo-of-the-day/development/images/1/2016-10-15-photo-of-the-day-2017-02-09%2019%3A52%3A53%20UTC" />
          </div>
        </div>
        <div className="row">
          <div className="col m2 offset-m5">
            <div className="left">
              <FlatButton text=""
                          icon="arrow_back"/>
            </div>
            <div className="right">
              <FlatButton text=""
                          icon="arrow_forward"/>
            </div>
          </div>
        </div>
        <BigButton  icon="favorite"/>
      </div>
    )
  }
}
