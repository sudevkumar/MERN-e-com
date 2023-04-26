import React from "react";
import Layout from "../components/Layouts/Layout";

function About() {
  return (
    <Layout title={"About Page - Brand Bazar"}>
      <div className="row contactus ">
        <div className="col-md-5 ">
          <img
            src="https://media.istockphoto.com/id/180716482/photo/about-us.jpg?s=1024x1024&w=is&k=20&c=hviiTnjGLep4_kMTTkjVHW6vy9um6ExtKX3d1L7iogQ="
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
