import React from 'react';

class HomePageView extends React.Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);

  }

  onLogin = () => {
    this.props.onLogin(true);
  }



  render() {
    return (
      <>
        <div className="container u-margin-top-medium">
          <div class="row">
            <div class="col-lg-4 col-md-6 ml-auto mr-auto">
              <div class="card">
                <form class="form" method="" action="">
                  <div class="card-header card-header-primary text-center">
                    <h4 class="card-title">Login</h4>
                  </div>
                  <div class="card-body">
                    <span class="bmd-form-group"><div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">face</i>
                        </span>
                      </div>
                      <input type="text" class="form-control" placeholder="Account Number..." />
                    </div>
                    </span>

                    <span class="bmd-form-group"><div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input type="password" class="form-control" placeholder="Password..." />
                    </div></span>
                  </div>
                  <div class="footer text-center">
                    <a href="#" class="btn btn-primary btn-wd btn-lg" onClick={this.onLogin}>Login &raquo;</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="section text-center">
            <h2 className="title">What our customers say!</h2>
          </div>
          <div className="team">
            <div className="row">
              <div className="col-md-3">
                <div className="team-player">
                  <div className="card card-plain">
                    <div className="col-md-6 ml-auto mr-auto">
                      <img src="yasir.jpeg" className="img-raised rounded-circle img-fluid" />
                    </div>
                    <h4 className="card-title">Yasir
                                        <br />
                      <small className="card-description text-muted">London Businessman</small>
                    </h4>
                    <div className="card-body">
                      <p className="card-description">
                        &quot;Hoot Power revolutionised my business!!&quot;
                                        </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-md-3">
                <div className="team-player">
                  <div className="card card-plain">
                    <div className="col-md-6 ml-auto mr-auto">
                      <img src="jeff.png" className="img-raised rounded-circle img-fluid" />
                    </div>
                    <h4 className="card-title">Jeff
                                        <br />
                      <small className="card-description text-muted">Long time customer</small>
                    </h4>
                    <div className="card-body">
                      <p className="card-description">
                        &quot;Hoot Power has levelled up the UK energy market!!&quot;
                                        </p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-3">
                <div className="team-player">
                  <div className="card card-plain">
                    <div className="col-md-6 ml-auto mr-auto">
                      <img src="karima.jpeg" className="img-raised rounded-circle img-fluid" />
                    </div>
                    <h4 className="card-title">Karima
                                        <br />
                      <small className="card-description text-muted">Innovator</small>
                    </h4>
                    <div className="card-body">
                      <p className="card-description">
                        &quot;Hoot Power for Business is amazing!!&quot;
                                        </p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-md-3">
                <div className="team-player">
                  <div className="card card-plain">
                    <div className="col-md-6 ml-auto mr-auto">
                      <img src="dpj.jpeg" className="img-raised rounded-circle img-fluid" />
                    </div>
                    <h4 className="card-title">David
                                        <br />
                      <small className="card-description text-muted">Welsh Businessman</small>
                    </h4>
                    <div className="card-body">
                      <p className="card-description">
                        &quot;I wouldn't buy my Owlectricity from anybody else!&quot;
                                        </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </>
    );
  }
}

export default HomePageView