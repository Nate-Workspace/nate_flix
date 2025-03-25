const Herobody = () => {
  return (
    <div className="hero-wrapper h-full w-full flex ">
      <div className="innerWidth flexColCenter -translate-y-16 z-10">
        <div className="flexColCenter gap-8">
          <div className="w-40 flex justify-center">
            <span  className="font-bold lg:text-8xl md:text-7xl sm:text-6xl text-center flex"> <p>Nate</p> <p className="text-red-600">Flix</p></span>
          </div>
          <div className="">
            <p className=" text-gray-200 max-w-xl text-center lg:text-xl md:text-lg sm:text-base font-extralight sm:px-2">
              Discover endless <b className="text-red-500">movies, TV shows, and more.</b> You will never run out of movies to watch. A friendly movie recommendation system
            </p>
          </div>
        </div>
        <div className="flexColCenter w-full g4 hero-bottom"></div>
      </div>
    </div>
  );
};

export default Herobody;
