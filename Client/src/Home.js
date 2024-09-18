import './Home.css'
import {slide1,slide2,slide3} from  './Web-Media'
import usp from './usp.png'
import Courses from "./Courses"
import { useEffect,useState } from 'react';
import { image } from 'framer-motion/client';

function Home(){
    const [images, setImages] = useState([]);
    useEffect(() => {
        // Fetch images from the back end
        fetch('http://localhost:3030/addSliderImages')
          .then(res => res.json())
          .then(data => setImages(data))
          .catch(err => console.log(err));
      }, []); 


    return(
        <div className="dynamic-content">
        <div className="slideshow">
        <div className="slides">
        {
        images.map((image, idx) => (
        <img src={image.imageUrl} key={idx} alt={`Slide ${image.id}`} style={{width:"100%",borderRadius:"20px"}}/>
      ))}
        {/* <img src={slide1} style={{width:"100%"}}></img>
        <img src={slide2} style={{width:"100%"}}></img>
        <img src={slide3} style={{width:"100%"}}></img>
        <img src={slide1} style={{width:"100%"}}></img> */}

        </div>
        </div>
    
        <h1 className="sidebar-below-text">Featured</h1>
  
        <div className="features-courses">
            <Courses/>
        </div>
  
        <h1 className="feature-courses-below-text">Unique Selling Propositions</h1>
  
        <div className="testimonials">
        <img src={usp} style={{width:"100%",height:"100%"}}></img>
        </div>
  
        <h2 className="testimonials-below-text">About Veeram</h2>
  
  
        <div className="about">
  
        </div>
  
  
        <div className="company">
  
        </div>
        </div>
    )


}

export default Home;