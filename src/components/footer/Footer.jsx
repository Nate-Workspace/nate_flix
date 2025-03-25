import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="flexCenter innerWidth paddings f-container">
        {/* Left side */}
        <div className="flexColStart f-left">
          <span className="font-bold lg:text-4xl md:text-3xl sm:text-2xl text-center flex">
            {" "}
            <p>Nate</p> <p className="text-red-600">Flix</p>
          </span>
          <span className="secondaryText">
            Our vision is to help people discover <br />
            the best movies seamlessly!
          </span>
        </div>

        {/* Right side */}
        <div className="flexColStart f-right">
          <span className="primaryTitle lg:text-4xl md:text-3xl sm:text-2xl">
            Information
          </span>
          <span className="secondaryText">
            Powered by the movie database API
          </span>

          <div className="flexStart f-navigation flex-wrap">
            <a
              href="https://www.instagram.com/natedevjs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://x.com/natedevjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter/X
            </a>
            <a
              href="https://www.threads.net/@natedevjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Threads
            </a>
            <a
              href="https://github.com/Nate-Workspace"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-israel-9015b4245/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linked in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
