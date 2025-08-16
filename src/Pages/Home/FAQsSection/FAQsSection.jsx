import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Healthy individuals aged 18–60, weighing at least 50 kg, and free from any major illness can donate blood.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 3 months (90 days). For plasma, the interval may be shorter.",
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes. All equipment used is sterile and disposable, ensuring complete safety for donors.",
  },
  {
    question: "What should I do before donating blood?",
    answer:
      "Eat a healthy meal, drink plenty of water, and avoid alcohol or smoking before donation.",
  },
  {
    question: "Can I donate if I take regular medicine?",
    answer:
      "It depends on the medicine. Consult with the blood bank/doctor before donating.",
  },
];

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-red-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 cursor-pointer border border-red-100 hover:shadow-lg transition"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <FiMinus className="text-red-500 text-xl" />
                ) : (
                  <FiPlus className="text-red-500 text-xl" />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
