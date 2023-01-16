import { React, useState, useRef } from "react";
import JoditEditor from "jodit-react";

export default function Edit() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-7 mb-8">
        <h3 className="text-xl mb-7 font-semibold border-b pb-4 text-black">
          Edit
        </h3>
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>
    </div>
  );
}
