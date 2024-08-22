// // import CarouselComponent from "./CarouselComponent";

// import FooterComponent from "./FooterComponent";
// import NavbarComponent from "./NavbarComponent";
// import CarouselComponent from "./CarouselComponent";
// import "../CSS/Home.css"
// //import SearchTrek from "./SearchTrekComponent";

// export default function HomeComponent()
// {
//     return(

//         <div>
//         <NavbarComponent/>
//          <div className="c-renderelement">
//         <CarouselComponent/>
//         </div>
//         {/* <div>
//         <SearchTrek/>
//         </div>  */}
//         <FooterComponent/>
//         </div>
//     )
// }
import React from 'react';
import NavbarComponent from './NavbarComponent';
import '../CSS/HomePage.css';

export default function HomeComponent() {
    return (
        <div>
            <NavbarComponent />
            <div className="homepage-content">
                <div className="quote-container">
                    <div className="quote-scroll">
                        <div className="quote">"Discover the joy of hobbies and enrich your life!"</div>
                        <div className="quote">"The best time to start a new hobby is now."</div>
                        <div className="quote">"Hobbies are the treasures of life."</div>
                        <div className="quote">"Explore new interests and passions every day."</div>
                        {/* Add more quotes here if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}
