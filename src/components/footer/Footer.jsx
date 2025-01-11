import React from "react";
import './Footer.css'

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="flexCenter innerWidth paddings f-container">
        {/* Left side */}
        <div className="flexColStart f-left">
          <img src="./NATEflix.png" alt="Logo2" width={120}/>
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them
          </span>
        </div>

        {/* Right side */}
        <div className="flexColStart f-right">
          <span className="primaryTitle">Information</span>
          <span className="secondaryText">Powered by the movie database API</span>

          <div className="flexStart f-navigation">
            <a href="">Instagram</a>
            <a href="">Twitter</a>
            <a href="">Threads</a>
            <a href="">Github</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
