import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [profilePic, setProfilePic] = useState(""); // uploaded image URL
  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios();

  // Load districts & upazilas
  useEffect(() => {
    const fetchData = async () => {
      const [districtData, upazilaData] = await Promise.all([
        fetch("/districts.json").then((res) => res.json()),
        fetch("/upazilas.json").then((res) => res.json()),
      ]);
      setDistricts(districtData);
      setUpazilas(upazilaData);
    };
    fetchData();
  }, []);

  // Filter upazilas when district changes
  const selectedDistrictId = watch("district");
  useEffect(() => {
    const matchedUpazilas = upazilas.filter(
      (u) => u.district_id === selectedDistrictId
    );
    setFilteredUpazilas(matchedUpazilas);
    setValue("upazila", ""); // reset upazila field
  }, [selectedDistrictId, upazilas, setValue]);

  // Submit handler
  const onSubmit = (data) => {
    const { name, email,password, blood_group, district, upazila } = data;
    console.log("🧾 Form Data:", data);

    if (!profilePic) {
      Swal.fire("Wait!", "Please upload your avatar first.", "warning");
      return;
    }
    //  Find district name using ID
    const selectedDistrict = districts.find(d => d.id === district);
  const districtName = selectedDistrict ? selectedDistrict.name : "";
    createUser(email,password)
      .then(async (result) => {
        console.log("✅ Firebase user created:", result.user);

        // ⏫ Update Firebase profile
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

         
          await updateUserProfile(userProfile)
          .then(()=>{
            console.log("✅ Firebase profile updated with avatar and name");
          })
          .catch(error=>{
            console.log(error)
          })
           


        //   ⛳ Save user to MongoDB
          const userInfo = {
            name,
            email,
            avatar: profilePic,
            blood_group,
            district:districtName,
            upazila,
            role: "donor", // default
            status: "active",
            created_at: new Date().toISOString(),
            
          };

          console.log("📦 Sending user to MongoDB:", userInfo);

          const userRes = await axiosInstance.post("/users", userInfo);
          console.log("✅ MongoDB response:", userRes.data);

          Swal.fire(
            "Success!",
            `${name}, your account has been created.`,
            "success"
          );
        
      })
      .catch((err) => {
        console.error("❌ Firebase createUser error:", err);
        Swal.fire("Error", err.message || "Registration failed", "error");
      });
  };

  // Handle avatar image upload
  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      console.log(res.data)
      const url = res.data.data.url;
      setProfilePic(url);
      console.log("🖼️ Image uploaded to imgBB:", url);
      
    } catch (err) {
      console.error("❌ Image upload error:", err);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Your Name"
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Your Email"
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        {/* Avatar */}
        <div>
          <label className="font-medium">Avatar</label>
          <input
            type="file"
            onChange={handleUploadImage}
            // {...register("avatar", { required: true })}
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          {/* {errors.avatar && (
            <p className="text-red-500 text-sm">Avatar is required</p>
          )} */}
        </div>

        {/* Blood Group */}
        <div>
          <label className="font-medium">Blood Group</label>
          <select
            {...register("blood_group", { required: true })}
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.blood_group && (
            <p className="text-red-500 text-sm">Select blood group</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="font-medium">District</label>
          <select
            {...register("district", { required: true })}
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">Select a district</p>
          )}
        </div>

        {/* Upazila */}
        <div>
          <label className="font-medium">Upazila</label>
          <select
            {...register("upazila", { required: true })}
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.upazila && (
            <p className="text-red-500 text-sm">Select upazila</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            placeholder="Password"
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Minimum 6 characters</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirm_password", {
              required: true,
              validate: (val) =>
                val === watch("password") || "Passwords don't match",
            })}
            placeholder="Confirm Password"
            className="w-full border rounded-md px-4 py-2 border-gray-300 focus:ring-red-500 focus:outline-none focus:ring-2"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
