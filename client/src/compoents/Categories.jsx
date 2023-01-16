import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
    <div className="bg-white shadow-lg rounded-lg p-7 mb-3">
      <h3 className="text-xl mb-7 font-semibold border-b pb-4 text-black">
        Categories
      </h3>
      {categories.map((category) => (
        <Link key={category.slug} to={`/category/${category.slug}`}>
          <span className=" mb-3 cursor-pointer block pb-3 text-black">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
