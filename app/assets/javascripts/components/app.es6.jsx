class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPhotos: [],
      photo: {},
      comments: [],
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

    this.incrementPhotoIndex = this.incrementPhotoIndex.bind(this)
    this.decrementPhotoIndex = this.decrementPhotoIndex.bind(this)
    this.handleBrowse = this.handleBrowse.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleEditComment = this.handleEditComment.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleMonthClick = this.handleMonthClick.bind(this)
    this.handleNewComment = this.handleNewComment.bind(this)
    this.handleYearClick = this.handleYearClick.bind(this)
  }

  componentDidMount() {
    const firstPhoto = 0;
    this.getPhotos(firstPhoto)
  }

  // Comments
  getComments(photo) {
    $.getJSON(`/api/v1/photos/${photo.id}/comments`, (response) => {
      this.setState({ comments: response })
    })
  }

  handleNewComment(comment) {
    this.getComments(this.state.photo)
  }

  handleDeleteComment(comment) {
    $.ajax({
      type: 'DELETE',
      url: `api/v1/comments/${comment.id}`
    })
    .done(() => this.getComments(this.state.photo));
  }

  handleEditComment(comment) {
    $.ajax({
      type: 'PATCH',
      url: `api/v1/comments/${comment.id}`,
      data: { comment: { body: comment.body }  },
    })
    .done(() => this.getComments(this.state.photo));
  }

  // Photos
  getPhotos(index) {
    $.getJSON('/api/v1/photos.json', (response) => {
      this.setState({ allPhotos:  response,
                      photo:      response[index],
                      photoIndex: index })
    })
    .done(() => {
      this.getComments(this.state.photo)
    })
  }

  decrementPhotoIndex() {
    if(this.state.photoIndex > 0) {
      const index = this.state.photoIndex - 1;
      this.setState({ photoIndex: index,
                      photo:      this.state.allPhotos[index],
                      comments:   [] })
      this.getComments(this.state.allPhotos[index])
    }
  }

  incrementPhotoIndex() {
    if(this.state.photoIndex < this.state.allPhotos.length) {
      const index = this.state.photoIndex + 1;
      this.setState({ photoIndex: index,
                      photo:      this.state.allPhotos[index],
                      comments:   [] })
      this.getComments(this.state.allPhotos[index])
    }
  }

  handleBrowse() {
    $.getJSON('/api/v1/photos/one-per-year', (response) => {
      console.log("one-per-year : ", response)
      this.setState(
        {
          filteredPhotos: response,
          componentName:  'PhotoList',
          photoListConfiguration: {
            handleClick: this.handleYearClick,
            smallPhotoType: 'year',
            listHeader: 'Browse by Year'
          }
        }
      )
    })
  }

  handleYearClick(year) {
    $.getJSON(`/api/v1/photos/one-per-month?year=${year}`, (response) => {
      this.setState(
        {
          componentName:  'PhotoList',
          comments: [],
          filteredPhotos: response,
          photoListConfiguration: {
            handleClick: this.handleMonthClick,
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
    $.getJSON(`${this.state.root}/all-month-year?year=${year}&month=${month}`, (response) => {
      this.setState(
        {
          filteredPhotos: response,
          componenName: 'PhotoList',
          photoListConfiguration: {
            handleClick: this.handleDayClick,
            smallPhotoType: 'day',
            listHeader: `Browse ${properMonth} ${year}`
          }
        }
      )
    })
  }

  handleDayClick(photo) {
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
    if (this.state.componentName === "PhotoList") {
      return (
        <div data-turbolinks="false">
          <NavigationHeader
            handleBrowse={ this.handleBrowse }
            user={ this.props.user }
          />
          <PhotoList
            config={ this.state.photoListConfiguration }
            photos={ this.state.filteredPhotos }
          />
        </div>
      )
    }
    else if (this.state.componentName === "PhotoShow") {
      return (
        <div data-turbolinks="false">
          <NavigationHeader
            handleBrowse={ this.handleBrowse }
            user={ this.props.user }
          />
          <PhotoShow
            back={ this.incrementPhotoIndex }
            comments={ this.state.comments }
            currentPhoto={ this.state.photo }
            currentUser={ this.props.user }
            forward={ this.decrementPhotoIndex }
            handleDeleteComment={ this.handleDeleteComment }
            handleEditComment={ this.handleEditComment }
            handleNewComment={ this.handleNewComment }
            photos={ this.state.allPhotos }
            photoIndex={ this.state.photoIndex }
          />
        </div>
      )
    }
  }
}
