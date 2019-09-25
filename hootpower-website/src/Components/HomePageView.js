import React from 'react';

class HomePageView extends React.Component {
    render() {
        return (
        <>
            <div className="container">
                <div className="section text-center">
                    <h2 className="title">What our customers say!</h2>
                </div>
                <div className="team">
                    <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                    </div>
                </div>
                
            </div>
        </>
        );
    }
}

export default HomePageView