import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Cards.css';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

function right() {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop showStatus={false} >

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
export default right