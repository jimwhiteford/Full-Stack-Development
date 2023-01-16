import { React, useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";

export const url = "http://localhost:3001/getCategories";

export default function Upload() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const sendContent = () => {
    setFormErrors(validate(content, photo, title));
    const slugTemp = title.replace(/\s+/g, "-").toLowerCase();
    console.log(formErrors);
    if (Object.keys(formErrors).length > 0 || !title || !photo || !content) {
      console.log("there is an error");
    } else {
      axios
        .post("http://localhost:3001/createPost", {
          title: title,
          slug: slugTemp,
          content: content,
          photo: photo,
          like: 0,
          category: category,
        })
        .then((response) => {
          alert("Post Created");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validate = (content, photo, title) => {
    const errors = {};
    const urlRegex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    if (!title) {
      errors.title = "Title is required!";
    }
    if (!photo) {
      errors.photo = "Photo is required!";
    } else if (!urlRegex.test(photo)) {
      errors.photo = "Must be a valid photo URL!";
    }
    if (!content) {
      errors.content = "Content is required!";
    }
    return errors;
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getCategories")
      .then(function (response) {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8" data-testid="upload-1">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-black">
        <div className="lg:col-span-8 col-span-1">
          {content || title || photo ? (
            <div className=" bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
              <div className="relative overflow-hidden shadow-md mb-6">
                {photo ? (
                  <img
                    src={photo}
                    alt=""
                    className="object-top h-full w-full rounded-t-lg"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full"></div>
                <h1 className="mb-8 text-4xl font-bold text-black">{title}</h1>
                <div
                  className="text-black"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </div>
          ) : (
            <div className=" bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
              <div className="relative overflow-hidden shadow-md mb-6"></div>
            </div>
          )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <div>
              <div className="bg-white shadow-lg rounded-lg p-7 mb-12">
                <h3 className="text-xl mb-7 font-semibold border-b pb-4 text-black">
                  Upload
                </h3>
                <div>
                  <div>
                    <p className="text-red-500">{formErrors.photo}</p>
                    <input
                      className="text-gray-800 px-4 p-2 mb-5 outline-none w-full rounded-lg focus:ring-1 focus: ring-gray-200 bg-gray-100"
                      placeholder="Photo URL"
                      name="photo"
                      type="text"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                    ></input>
                    <p className="text-red-500">{formErrors.title}</p>
                    <input
                      className="text-gray-800 px-4 p-2 mb-5 outline-none w-full rounded-lg focus:ring-1 focus: ring-gray-200 bg-gray-100"
                      placeholder="Title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="text-gray-800 px-4 p-2 mb-5 outline-none w-full rounded-lg focus:ring-1 focus: ring-gray-200 bg-gray-100"
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-red-500">{formErrors.content}</p>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => setContent(newContent)}
                  />
                </div>
                <div className="text-center" type="submit">
                  <div onClick={sendContent}>
                    <span className="transition duration-200 transform hover:-translate-y-1 inline-block hover:bg-purple-500 bg-purple-700 text-lg font-medium rounded-full text-white px-8 py-2 mt-7 cursor-pointer">
                      Save
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
