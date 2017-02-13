class NavigationHeader extends React.Component {
  signOut() {
    console.log("Sign Out")
    $.ajax({
        url: "/sign_out",
        type: 'DELETE',
    }).then(this.redirectToLogin);
  }

  redirectToLogin() {
    location.href = "/sign_in"
  }

  render () {
    return (
      <div>
        <nav>
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Spevack Twins</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
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
