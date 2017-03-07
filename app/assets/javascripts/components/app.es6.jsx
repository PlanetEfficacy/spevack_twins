class App extends React.Component {
  constructor(props) {
    super(props)
    this._handleDayClick = this._handleDayClick.bind(this);
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
    this.handleNewComment = this.handleNewComment.bind(this)
  }

  componentDidMount() {
    const firstPhoto = 0;
    this.getPhotos(firstPhoto)
  }

  getComments(photo) {
    $.getJSON(`/api/v1/photos/${photo.id}/comments`, (response) => {
      this.setState({ comments: response })
    })
  }

  handleNewComment(comment) {
    const comments = this.state.comments.push(comment)
    this.setState({ comments: comments })
  }

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
    $.getJSON(`/api/v1/photos/one-per-month?year=${year}`, (response) => {
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
    $.getJSON(`${this.state.root}/all-month-year?year=${year}&month=${month}`, (response) => {
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

  handleDeleteComment(comment) {
    $.ajax({
      type: 'DELETE',
      url: `api/v1/photos/${this.state.photo.id}/comments/${comment.id}`
    })
    .done(() => this.getComments(this.state.photo));
  }

  handleEditComment(comment) {
    $.ajax({
      type: 'PATCH',
      url: `api/v1/photos/${this.state.photo.id}/comments/${comment.id}`,
      data: { comment: { body: comment.body }  },
    })
    .done(() => this.getComments(this.state.photo));
  }

  render () {
    if (this.state.componentName === "PhotoList") {
      return (
        <div>
          <NavigationHeader user={ this.props.user }
                            handleBrowse={ this.handleBrowse } />
          <PhotoList photos={ this.state.filteredPhotos }
                     config={ this.state.photoListConfiguration } />
        </div>
      )
    }
    else if (this.state.componentName === "PhotoShow") {
      return (
        <div>
          <NavigationHeader user={ this.props.user }
                            handleBrowse={ this.handleBrowse } />
          <PhotoShow
            photos={ this.state.allPhotos }
            photoIndex={ this.state.photoIndex }
            currentPhoto={ this.state.photo }
            forward={ this.decrementPhotoIndex }
            back={ this.incrementPhotoIndex }
            user={ this.props.user }
            handleNewComment={ this.handleNewComment }
            comments={ this.state.comments }
            handleDeleteComment={ this.handleDeleteComment }
            handleEditComment={ this.handleEditComment }
          />
        </div>
      )
    }
  }
}
