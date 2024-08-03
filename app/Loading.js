"use client";
 import { Spinner } from "react-bootstrap";
 
const Loading = () => {
  return (
    <div className="m-5">
 
      <Spinner animation="border" role="status" style={{color:"#3083fd"}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
