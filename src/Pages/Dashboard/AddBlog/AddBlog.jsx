import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
 
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddBlog = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");

  const [uploading, setUploading] = useState(false);

  // Upload image to imageBB
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = import.meta.env.VITE_imgbb_key; // Use your imageBB API key from environment variables

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setUploading(false);

      if (data.success) {
        setThumbnail(data.data.url);
        Swal.fire("Success!", "Image uploaded", "success");
      } else {
        Swal.fire("Error", "Failed to upload image", "error");
      }
    } catch (error) {
      setUploading(false);
      Swal.fire(`"Error", "Failed to upload image", ${error}`);
    }
  };

  const { mutateAsync: createBlog } = useMutation({
    mutationFn: (newBlog) => axiosSecure.post("/blogs", newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Success!", "Blog created successfully", "success");
      navigate("/dashboard/content-management");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !content) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    createBlog({ title, thumbnail, content, authorEmail: "admin@example.com" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e.target.files[0])}
            disabled={uploading}
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail preview"
              className="mt-2 h-40 object-contain rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-medium mb-2">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${uploading ? "btn-disabled" : ""}`}
          disabled={uploading}
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
