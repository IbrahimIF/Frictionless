import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Cards.css';



/*Left area for carousel card,  Analyse*/
function left() {
    return (
        <div className="carousel-wrapper" >
            <Carousel infiniteLoop showStatus={false} set showThumbs={false} >

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Context Analysis</p>
                                <p className="text-body">Hover to see more</p>
                                </div>
                            <div className="card-back">
                                <p>Identify its purpose, where it fits in the program, and the specific function or module it's part of. Knowing the high-level objectives provides a foundation for understanding the code's intricacies.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>
                

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Syntax and Patterns</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Track how variables change, observe their manipulation through various operations, and note input and output points. Tracing the execution path helps in understanding the code's logic and functionality.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

                <div>
                    <div className="cardArea">
                        <div className="card">
                            <div className="card-info">
                                <p className="text-title">Control Flow</p>
                                <p className="text-body">Hover to see more</p>
                            </div>
                            <div className="card-back">
                                <p>Familiarize yourself with the language's conventions and specific features. Recognizing language-specific constructs, loops and if statments. It is crucial for understanding the code's logic and behavior.</p>
                            </div>
                        </div>
                    </div>
                    <button className="button-link" onClick={() => window.location.href = "https://www.example.com"}>read more</button>
                </div>

            </Carousel>
        </div>
    );
}
export default left