import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Cards.css';


function central() {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop>

            <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info"><p>Hover</p></div>
                            <div className="card-back">
                                    <p className="heading">Card Hover</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipii</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info"><p>Hover</p></div>
                            <div className="card-back">
                                    <p className="heading">Card Hover</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipii</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info"><p>Hover</p></div>
                            <div className="card-back">
                                    <p className="heading">Card Hover</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipii</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Carousel>
        </div>
    );
}
export default central