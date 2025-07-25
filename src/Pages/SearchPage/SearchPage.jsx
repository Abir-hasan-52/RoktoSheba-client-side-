import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SearchPage = () => {
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");

  // Load district & upazila data
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then(setDistricts);
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then(setUpazilas);
  }, []);

  // Filter upazilas based on district
  const filteredUpazilas = upazilas.filter((u) => {
    const districtMatch = districts.find((d) => d.name === selectedDistrict);
    return districtMatch && u.district_id === districtMatch.id;
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.get("/donors", {
        params: {
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
        },
      });
      setDonors(res.data);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        Search Blood Donors
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-4 gap-4 items-end bg-white p-6 rounded-xl shadow"
      >
        {/* Blood Group */}
        <div>
          <label className="label font-medium">Blood Group</label>
          <select
            className="select select-bordered w-full"
            {...register("bloodGroup", { required: true })}
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label font-medium">District</label>
          <select
            className="select select-bordered w-full"
            {...register("district", { required: true })}
          >
            <option value="">Select</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label font-medium">Upazila</label>
          <select
            className="select select-bordered w-full"
            {...register("upazila", { required: true })}
          >
            <option value="">Select</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div>
          <button type="submit" className="btn btn-error w-full">
            Search
          </button>
        </div>
      </form>

      {/* Donor List */}
      {hasSearched && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            {donors.length
              ? "Donors Found:"
              : "No donors found for your search."}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={donor.avatar || "/avatar.png"}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{donor.name}</h4>
                    <p className="text-sm text-gray-500">{donor.email}</p>
                    <p className="text-sm text-gray-600">
                      {donor.blood_group} | {donor.district}, {donor.upazila}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
