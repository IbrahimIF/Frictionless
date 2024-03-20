import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Cards.css';



/*Right area for carousel card,  Improve*/
function right() {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop showStatus={false} set showThumbs={false} >

            <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Optimizing Performance</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Identify performance bottlenecks, optimize algorithms, and minimize redundant operations to make the code more efficient.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Code Readability</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Prioritize code readability with meaningful names and consistent conventions. Well-organized code is easier to understand and maintain.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Error Handling </p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Strengthen code robustness by implementing comprehensive error handling. Anticipate potential issues and provide meaningful error messages.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

            </Carousel>
        </div>
    );
}
export default right