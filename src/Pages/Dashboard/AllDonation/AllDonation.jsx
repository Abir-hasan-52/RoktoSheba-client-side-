// 🧩 Necessary Imports
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaInfoCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import { img } from "framer-motion/client";
import { useNavigate } from "react-router";
import useUserRole from "../../../Hooks/useUserRole";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";

const ITEMS_PER_PAGE = 5;
const MySwal = withReactContent(Swal);

const AllDonation = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();
  const { role } = useUserRole();

  // 👉 Fetch Donation Requests
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allDonations", currentPage, filterStatus],
    queryFn: async () => {
      let url = `/all-donations?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
      if (filterStatus !== "all") {
        url += `&status=${filterStatus}`;
      }
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  // 👉 Fetch Active Donors
  const {
    data: activeDonors = [],
    isLoading: donorsLoading,
    isError: donorsError,
  } = useQuery({
    queryKey: ["activeDonors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers/active-donors");
      return res.data;
    },
  });

  const { donations = [], totalCount = 0 } = data;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be123c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myDonations/${id}`).then(() => {
          Swal.fire("Deleted!", "Donation request deleted.", "success");
          refetch();
        });
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    axiosSecure.patch(`/donations/${id}`, { status }).then(() => {
      Swal.fire("Updated!", `Status changed to ${status}`, "success");
      refetch();
    });
  };

  const handleAssignDonor = async (donationId) => {
    const donorOptions = activeDonors
      .map((donor) => {
        return `
        <option value="${donor.email}">
          ${donor.name} | ${donor.blood_group} | ${donor.district}, ${donor.upazila}
        </option>
      `;
      })
      .join("");

    const { value: donorEmail } = await Swal.fire({
      title: "<span style='color:#0d6efd;'>Assign Donor</span>",
      html: `
      <label for="donorSelect" style="font-weight: 600; display:block; margin-bottom: 8px; color:#333;">
        Select a donor
      </label>
      <select id="donorSelect" class="swal2-select" style="
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 16px;
        background-color: #f9f9f9;
        color: #333;
      ">
        <option value="">-- Choose a Donor --</option>
        ${donorOptions}
      </select>
    `,
      width: "400px",
      confirmButtonText: "<i class='fas fa-check'></i> Assign",
      cancelButtonText: "<i class='fas fa-times'></i> Cancel",
      showCancelButton: true,
      confirmButtonColor: "#198754", // Green
      cancelButtonColor: "#dc3545", // Red
      focusConfirm: false,
      preConfirm: () => {
        const select = Swal.getPopup().querySelector("#donorSelect");
        const value = select.value;
        if (!value) {
          Swal.showValidationMessage("Please select a donor");
        }
        return value;
      },
    });

    if (donorEmail) {
      try {
        await axiosSecure.patch(`/donation/assign-donor/${donationId}`, {
          donorEmail,
        });
        Swal.fire({
          title: "✅ Success!",
          text: "Donor assigned successfully.",
          icon: "success",
          confirmButtonColor: "#0d6efd",
        });
        refetch();
      } catch (err) {
        Swal.fire({
          title: "❌ Error",
          text: err.response?.data?.message || "Failed to assign donor",
          icon: "error",
          confirmButtonColor: "#dc3545",
        });
      }
    }
  };

  // 👁️ View Donor Info
  const handleViewDonor = async (donorEmail) => {
    try {
      const res = await axiosSecure.get(`/users/donor/${donorEmail}`);
      const donor = res.data;

      await Swal.fire({
        title: donor.name,
        html: `
        <img src="${donor.avatar}" 
             alt="avatar" 
             style="width:100px; height:100px; border-radius:50%; margin: 10px auto; display: block;" />
        <p><strong>Email:</strong> ${donor.email}</p>
        <p><strong>Blood Group:</strong> ${donor.blood_group}</p>
        <p><strong>District:</strong> ${donor.district}</p>
        <p><strong>Upazila:</strong> ${donor.upazila}</p>
      `,
        showCloseButton: true,
        confirmButtonText: "Close",
      });
    } catch (err) {
      Swal.fire("Error", "Donor not found or not active", "error");
    }
  };

  if (isLoading || donorsLoading) return <RoktoLoading />;

  if (isError || donorsError)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Error loading data.
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#be123c]">
        All Blood Donation Requests
      </h2>

      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
        <select
          className="select select-bordered max-w-xs"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(0);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th>Recipient</th>
                <th>Blood Group</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.recipientName}</td>
                  <td>{donation.bloodGroup}</td>
                  <td>
                    {donation.recipientDistrict}, {donation.recipientUpazila}
                  </td>
                  <td>
                    {new Date(donation.donationDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        donation.status === "pending"
                          ? "badge-warning"
                          : donation.status === "inprogress"
                          ? "badge-info"
                          : donation.status === "done"
                          ? "badge-success"
                          : donation.status === "canceled"
                          ? "badge-error"
                          : "badge-neutral"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="text-center space-x-1">
                    <button
                      title="View"
                      disabled={role !== "admin"}
                      className="btn btn-sm btn-ghost"
                      onClick={() =>
                        navigate(`/dashboard/donation-details/${donation._id}`)
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      title="Edit"
                      disabled={role !== "admin"}
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        navigate(`/dashboard/editDonation/${donation._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      disabled={role !== "admin"}
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(donation._id)}
                    >
                      <FaTrash />
                    </button>
                    {donation.status === "inprogress" && (
                      <>
                        <button
                          title="Mark Done"
                          disabled={role !== "admin"}
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            handleStatusUpdate(donation._id, "done")
                          }
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          title="Cancel"
                          disabled={role !== "admin"}
                          className="btn btn-sm btn-error"
                          onClick={() =>
                            handleStatusUpdate(donation._id, "canceled")
                          }
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                    <button
                      title={
                        donation.status !== "pending"
                          ? "Donor can be assigned only when status is Pending"
                          : donation.assignedDonor
                          ? "Donor Already Assigned"
                          : "Assign Donor"
                      }
                      className={`btn btn-sm btn-outline ${
                        donation.status !== "pending" || donation.assignedDonor
                          ? "btn-disabled text-gray-400 cursor-not-allowed"
                          : "btn-info"
                      }`}
                      onClick={() => handleAssignDonor(donation._id)}
                      disabled={
                        role !== "admin" ||
                        donation.status !== "pending" ||
                        !!donation.assignedDonor
                      }
                    >
                      <FaUserPlus />
                    </button>

                    {donation.donorEmail && (
                      <button
                        title="View Donor Info"
                        disabled={role !== "admin"}
                        className="btn btn-sm btn-outline btn-accent"
                        onClick={() => handleViewDonor(donation.donorEmail)}
                      >
                        <FaInfoCircle />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-6 flex justify-center">
          <ReactPaginate
            key={currentPage}
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            forcePage={currentPage}
            containerClassName={"flex gap-2 text-sm"}
            pageClassName={
              "px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-100"
            }
            activeClassName={"bg-blue-600 text-white"}
            previousClassName={
              "px-3 py-1 border rounded-md cursor-pointer select-none"
            }
            nextClassName={
              "px-3 py-1 border rounded-md cursor-pointer select-none"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
          />
        </div>
      )}
    </div>
  );
};

export default AllDonation;
