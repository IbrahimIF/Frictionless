import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Cards.css';


function central() {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop showStatus={false}>

            <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Debugging Techniques</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Use debugging tools to find and fix errors. Breakpoints, step through the code, and inspect variable values during runtime. Debugging helps pinpoint error locations.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Error Messages</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Pay attention to error messages and stack traces for clues. They provide information about the error type, location, and sequence of events leading to the error.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Code Review</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Engage in code reviews with peers for a fresh perspective. Code reviews catch errors, inconsistencies, and improve overall code quality.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

            </Carousel>
        </div>
    );
}
export default central