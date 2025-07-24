import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaDonate } from "react-icons/fa";

const GiveFundingForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [stripeError, setStripeError] = useState("");
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;

    console.log("💳 Form Data Before Server:", data);

    const confirmed = await Swal.fire({
      title: "Confirm Donation",
      text: `You are about to donate ${data.amount} ${data.currency}. Proceed?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Donate!",
    });

    if (!confirmed.isConfirmed) return;

    const amountInCents = parseFloat(data.amount) * 100;
    const card = elements.getElement(CardElement);
    if (!card) return setStripeError("Card information is incomplete.");

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setStripeError(error.message);
      setProcessing(false);
      return;
    } else {
      setStripeError("");
      console.log("✅ Stripe Payment Method:", paymentMethod);
    }

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        currency: data.currency,
      });

      const clientSecret = res.data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (paymentResult.error) {
        setStripeError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        const donationInfo = {
          userId: user?.uid,
          userName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          amount: parseFloat(data.amount),
          currency: data.currency,
          phone: data.phone,
          purpose: data.purpose,
          date: new Date(),
          paymentStatus: "succeeded",
          transactionId: paymentResult.paymentIntent.id,
        };

        await axiosSecure.post("/fundings", donationInfo);
        reset();
        Swal.fire("🎉 Thank You!", "Your donation was successful.", "success");
      }
    } catch (err) {
      console.error("Server Error:", err);
      setStripeError("❌ Something went wrong during donation.");
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md border border-red-100">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
        <FaDonate className="inline-block text-red-500 mr-2" />
        Fund Roktosheba ❤️
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {stripeError && <p className="text-sm text-red-500">{stripeError}</p>}

        {/* Email (read-only) */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>

        {/* Name (read-only) */}
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            min="1"
            {...register("amount", { required: "Amount is required" })}
            className="input input-bordered w-full"
            placeholder="e.g., 50"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        {/* Currency Select */}
        <div>
          <label className="text-sm font-medium">Currency</label>
          <select
            {...register("currency", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="BDT">USD</option>
            <option value="USD">BDT</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label className="text-sm font-medium">Purpose</label>
          <input
            type="text"
            {...register("purpose", { required: "Purpose is required" })}
            className="input input-bordered w-full"
            placeholder="e.g., Blood Camp, Emergency Reserve"
          />
          {errors.purpose && (
            <p className="text-red-500 text-sm">{errors.purpose.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number required" })}
            className="input input-bordered w-full"
            placeholder="e.g., +8801XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Card Info */}
        <div>
          <label className="text-sm font-medium">Card Information</label>
          <div className="border rounded-md p-3">
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-wide bg-red-600 hover:bg-red-700 text-white w-full"
          disabled={processing}
        >
          {processing ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </div>
  );
};

export default GiveFundingForm;
