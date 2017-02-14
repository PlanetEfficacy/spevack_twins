class App extends React.Component {
  constructor(props) {
    super(props)
    this._handleDayClick = this._handleDayClick.bind(this);
    this.state = {
      allPhotos: [],
      photo: {},
      componentName: 'PhotoShow',
      photoIndex: 0,
      filteredPhotos: [],
      root: '/api/v1/photos',
      photoListConfiguration: {
        handleClick: '',
        smallPhotoType: '',
        listHeader: ''
      }
    }
  }

  componentDidMount() {
    const firstPhoto = 0;
    this.getPhotos(firstPhoto)
  }

  getPhotos(index) {
    $.getJSON('/api/v1/photos.json', (response) => {
      this.setState({ allPhotos:  response,
                      photo:      response[index],
                      photoIndex: index })
    });
  }

  decrementPhotoIndex() {
    if(this.state.photoIndex > 0) {
      const index = this.state.photoIndex - 1;
      this.setState({ photoIndex: index,
                      photo:      this.state.allPhotos[index] })
    }
  }

  incrementPhotoIndex() {
    if(this.state.photoIndex < this.state.allPhotos.length) {
      const index = this.state.photoIndex + 1;
      this.setState({ photoIndex: index,
                      photo:      this.state.allPhotos[index] })
    }
  }

  handleBrowse() {
    console.log("Getting one per year photos")
    $.getJSON('/api/v1/photos/one-per-year', (response) => {
      console.log(response)
      this.setState(
        {
          filteredPhotos: response,
          componentName:  'PhotoList',
          photoListConfiguration: {
            handleClick: this.handleYearClick.bind(this),
            smallPhotoType: 'year',
            listHeader: 'Browse by Year'
          }
        }
      )
    })
  }

  handleYearClick(year) {
    console.log("Getting all photos for month " + year)
    $.getJSON(`/api/v1/photos/one-per-month?year=${year}`, (response) => {
      console.log(response)
      this.setState(
        {
          filteredPhotos: response,
          componentName:  'PhotoList',
          photoListConfiguration: {
            handleClick: this.handleMonthClick.bind(this),
            smallPhotoType: 'month',
            listHeader: 'Browse ' + year
          }
        }
      )
    })
  }

  handleMonthClick(year, month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let properMonth = months[parseInt(month) - 1];
    console.log(`Getting all photos for ${month} ${year}`)
    $.getJSON(`${this.state.root}/all-month-year?year=${year}&month=${month}`, (response) => {
      console.log(response)
      this.setState(
        {
          filteredPhotos: response,
          componenName: 'PhotoList',
          photoListConfiguration: {
            handleClick: this._handleDayClick.bind(this),
            smallPhotoType: 'day',
            listHeader: `Browse ${properMonth} ${year}`
          }
        }
      )
    })
  }

  _handleDayClick(photo) {
    console.log(`Day click with photo`)
    console.log(photo)
    this.state.allPhotos.forEach((p, i) => {
      if (p.id === photo.id){
        this.setState(
          {
            componentName: 'PhotoShow',
            photo: photo,
            photoIndex: i
          }
        )
        return;
      }
    }, this);
  }

  render () {
    console.log("App.render() has just been invoked!")
    if (this.state.componentName === "PhotoList") {
      return (
        <div>
          <NavigationHeader user={ this.props.user }
                            handleBrowse={ this.handleBrowse.bind(this) } />
          <PhotoList photos={ this.state.filteredPhotos }
                     config={ this.state.photoListConfiguration } />
        </div>
      )
    }
    else if (this.state.componentName === "PhotoShow") {
      return (
        <div>
          <NavigationHeader user={ this.props.user }
                            handleBrowse={ this.handleBrowse.bind(this) } />
          <PhotoShow  photos={ this.state.allPhotos }
                      photoIndex={ this.state.photoIndex }
                      currentPhoto={ this.state.photo }
                      forward={ this.decrementPhotoIndex.bind(this) }
                      back={ this.incrementPhotoIndex.bind(this) } />
        </div>
      )
    }
  }
}
