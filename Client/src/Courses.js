import { auto } from "openai/_shims/registry.mjs";
import "./Courses.css";
import { slide1, slide2, slide3 } from "./Web-Media";
import { useState, useEffect } from "react";

import React from "react";

function SingleCourse({
  title,
  description,
  price,
  discountedprice,
  url,
  id,
  onViewDetails,
}) {
  return (
    <div className="singleCourse">
      <div className="singleCourseImage">
        <img
          src={url}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "17px 17px 0px 0px",
          }}
        ></img>
      </div>
      <div className="singleCourseText">
        <h3 style={{ fontSize: "1.1em" }}>{title}</h3>

        <p style={{ color: "grey", fontSize: "0.85em" }}>{description}</p>
        <br></br>
        {/* <span style={{fontSize:"1.3em",marginLeft:"5%"}}>₹{discountedprice}&nbsp; </span> */}
        <span style={{ marginLeft: "5%", fontWeight: "bold" }}> {price}</span>
        <button
          style={{
            width: "90%",
            maxHeight: "40px",
            marginLeft: "5%",
            marginTop: "4%",
            marginBottom: "4%",
            fontSize: "1.6em",
            borderRadius: "20px",
            backgroundColor: "rgb(0, 132, 255)",
            color: "white",
          }}
          onClick={() => {
            onViewDetails(id);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function Courses() {
  const [coursesArray, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseNumber, loadCourse] = useState("1");
  const [fullCourse, setFullCourse] = useState(true);
  useEffect(() => {
    // fetch('http://localhost:3030/cours')
    //     .then(response => response.json()
    //     )
    //     .then(data => {
    //         setCourses(data);
    //         setLoading(true);
    //         console.log(data);
    //     }
    //     )
    //     .catch(error=>console.log(error))
    fetch("http://localhost:3030/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Return the promise from response.json()
      })
      .then((data) => {
        setCourses(data); // Update state with the fetched data
        setLoading(false); // Data is loaded, set loading to false
        console.log("Fetched Data:", data); // Log the data with a label
      })
      .catch((error) => {
        console.log("Fetch Error:", error); // Log any errors that occur
        setLoading(false); // Stop loading in case of an error
      });
  }, []);

  const handleViewDetails = (id) => {
    setFullCourse(false);
    loadCourse(id);
  };
  return (
    <div className="courses-page">
      {loading ? (
        <div className="courses-page">
          <div>Loading...</div>
        </div>
      ) : fullCourse ? (
        <div className="courses-page">
          {coursesArray.map((course) => (
            <SingleCourse
              key={course.courseId}
              url={course.url}
              title={course.title}
              price={course.price}
              description={course.about}
              id={course.courseId}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="container">
          <div className="course-heading-block">
            <p className="test">{coursesArray[courseNumber - 1].description}</p>
            <SingleCourse
              className="course-card"
              key={coursesArray[courseNumber - 1].courseId}
              url={coursesArray[courseNumber - 1].url}
              title={coursesArray[courseNumber - 1].title}
              price={coursesArray[courseNumber - 1].price}
              description={coursesArray[courseNumber - 1].about}
              id={coursesArray[courseNumber - 1].courseId}
              onViewDetails={handleViewDetails}
            />
            <span className="course-headingblock-text">
              {coursesArray[courseNumber - 1].title}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  // return(
  //     <div className="courses-page">
  //     <SingleCourse url={slide1} text="Complete Web Development + Devops + Blockchain Cohort" descryption="15days course starting from 1November" price="8499" discountedprice="4999"/>
  //     <SingleCourse url={slide2} text="Complete Web development + Devops Cohort" descryption="15days course starting from 1November" price="5999" discountedprice="3999"/>
  //     <SingleCourse url={slide3} text="Complete Web3/Blockchain Cohort" descryption="15days course starting from 1November" price="5999" discountedprice="3999"/>
  //     <SingleCourse url={slide3} text="Complete Web3/Blockchain Cohort" descryption="15days course starting from 1November" price="5999" discountedprice="3999"/>
  //     <SingleCourse url={slide3} text="Complete Web3/Blockchain Cohort" descryption="15days course starting from 1November" price="5999" discountedprice="3999"/>
  //     </div>
  // )
}

export default Courses;
