class NavigationHeader extends React.Component {
  constructor(props) {
    super(props)

    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToPhotos = this.redirectToPhotos.bind(this);
    this.showNewPhoto = this.showNewPhoto.bind(this);
  }

  signOut() {
    $.ajax({
        url: "/sign_out",
        type: 'DELETE',
    }).then(this.redirectToLogin);
  }

  redirectToLogin(e) {
    e.preventDefault();
    location.href = "/sign_in"
  }

  redirectToPhotos(e) {
    e.preventDefault();
    location.href = "/photos"
  }

  showNewPhoto() {
    if (this.props.user.email === "jspevack@gmail.com") {
      console.log('Current user: ', this.props.user.email)
      return (
        <li>
          <a href="/photos/new">
            <i className="material-icons">create</i>
          </a>
        </li>
      )
    }
  }

  render () {
    return (
      <div>
        <nav>
          <div className="container">
            <div className="nav-wrapper">
              <a
                className="brand-logo"
                href="#" 
                onClick={ this.redirectToPhotos }
              >
                Spevack Twins
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                { this.showNewPhoto() }
                <li><a href="#"><i className="material-icons">favorite</i></a></li>
                <li><a href="#"><i className="material-icons">search</i></a></li>
                <li><a href="#" onClick={this.props.handleBrowse}><i className="material-icons">collections</i></a></li>
                <li>
                  <a href="#" onClick={this.signOut.bind(this)} id="sign-out">
                    <img  src={this.props.user.image}
                          className="circle responsive-img account-img"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
