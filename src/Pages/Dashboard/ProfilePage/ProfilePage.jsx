import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [profilePic, setProfilePic] = useState(""); // uploaded image URL
  const { updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // watch district as id
  const selectedDistrictId = useWatch({
    control,
    name: "district",
    defaultValue: "", // will be set after profile load
  });

  // Fetch user profile
  const { data: profile = {}, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // Load districts and upazilas JSON
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then(setDistricts);

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then(setUpazilas);
  }, []);

  // After profile loads, set default form values
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("avatar", profile.avatar || "");
      setValue("email", profile.email || "");
      setValue("bloodGroup", profile.blood_group || "");

      // Find district id by name from districts array
      const districtObj = districts.find((d) => d.name === profile.district);
      setValue("district", districtObj ? districtObj.id : "");

      setValue("upazila", profile.upazila || "");
    }
  }, [profile, districts, setValue]);

  // Filter upazilas based on selected district id
  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  // Image upload handler (imgbb)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imgbbAPIKey = import.meta.env.VITE_imgbb_key;

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        const imageUrl = data.data.url;
        setProfilePic(imageUrl);
        setValue("avatar", imageUrl);

        // 🟢 Update Firebase profile photoURL and displayName
        const userProfile = {
          displayName: watch("name") || "",
          photoURL: imageUrl,
        };
        await updateUserProfile(userProfile)
          .then(() => {
            console.log("✅ Firebase profile updated with avatar and name");
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire("Uploaded!", "Profile picture updated", "success");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  // Mutation to update profile on server
  const mutation = useMutation({
    mutationFn: async (data) => {
      // Find district name to send to backend (since UI uses id)
      const districtObj = districts.find((d) => d.id === data.district);
      const payload = {
        ...data,
        district: districtObj ? districtObj.name : "",
      };
      return await axiosSecure.patch(`/users/${user?.email}`, payload);
    },
    onSuccess: () => {
      Swal.fire("Success", "Profile updated successfully", "success");
      setIsEditing(false);
      refetch();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">My Profile</h2>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`btn btn-sm ${
            isEditing ? "btn-outline btn-error" : "btn-primary"
          }`}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Avatar preview & upload */}
      <div className="mb-4 text-center">
        <img
          src={useWatch({ control, name: "avatar" }) || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover mx-auto border"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-sm mt-2"
            onChange={handleImageUpload}
          />
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden avatar URL */}
        <input type="hidden" {...register("avatar")} />

        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            disabled={!isEditing}
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email (always disabled) */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            disabled
            className="input input-bordered w-full bg-gray-100"
            {...register("email")}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <input
            type="text"
            disabled={!isEditing}
            className="input input-bordered w-full"
            {...register("bloodGroup", { required: "Blood group is required" })}
          />
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            disabled={!isEditing}
            className="select select-bordered w-full"
            {...register("district", { required: "District is required" })}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        {/* Upazila */}
        <div>
          <label className="label">Upazila</label>
          <select
            className="select select-bordered w-full"
            disabled={!isEditing}
            {...register("upazila", { required: true })}
            value={watch("upazila") || ""}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save button */}
        {isEditing && (
          <div className="text-right">
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
