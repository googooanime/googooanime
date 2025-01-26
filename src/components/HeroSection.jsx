import React from "react";

const Hero = () => {
  return (
    <div className="bg-red-800
     text-white py-20 text-center">
      <h1 className="text-4xl font-bold">Welcome to Shop!</h1>
      <p className="mt-4 text-lg">
        Explore the best deals on top products. Shop now!
      </p>
      <button className="mt-6 bg-blue-500 px-6 py-3 text-lg rounded-lg hover:bg-blue-600">
        Browse Products
      </button>
    </div>
  );
};

export default Hero;
