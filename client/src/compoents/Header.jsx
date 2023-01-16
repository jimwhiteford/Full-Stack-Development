import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const logo = require("../assets/logo.png");

export const url = "http://localhost:3001/getCategories";

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // async function getCategories() {
    //   try {
    //     const {
    //       data: { results },
    //     } = await axios.get(url);
    //     setCategories(results);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getCategories();
    axios
      .get("http://localhost:3001/getCategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-black py-8">
        <div className="md:float-left block">
          <a href="/">
            <img
              src={logo}
              width="170px"
              className="cursor-pointer text-black"
              alt="logo"
            ></img>
          </a>
        </div>
        <Link
          to="/upload"
          className="float-right mt-10 text-black mr-4 text-xl font-semibold cursor-pointer hover:text-purple-700 hover:-translate-y-1 inline-block"
        >
          Upload
        </Link>
        <div className="md:contents">
          {categories.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              <span
                data-testid="row"
                className="md:float-right mt-10 text-black mr-4 text-xl font-semibold cursor-pointer hover:text-purple-700 hover:-translate-y-1 inline-block"
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
