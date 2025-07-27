import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    id: 1,
    name: "Rahim Uddin",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    story:
      "I donated blood to save my younger brother. I’m happy to have saved his life.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fatema Begum",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    story:
      "I received blood from my family during a critical time. Thank you to all the kind people who donate blood.",
    rating: 4,
  },
  {
    id: 3,
    name: "Jamal Khan",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    story:
      "Donating blood makes me feel more alive. It is a noble act, and I encourage everyone to do it.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sabrina Akter",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    story:
      "I was in an accident, and a stranger’s blood donation saved my life. I now donate regularly.",
    rating: 5,
  },
  {
    id: 5,
    name: "Mehedi Hasan",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    story:
      "It feels amazing knowing that my one bag of blood could help someone live longer.",
    rating: 4,
  },
  {
    id: 6,
    name: "Nusrat Jahan",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    story:
      "I was scared at first, but donating blood was easy and fulfilling. I’ll do it again!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const length = testimonialsData.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds interval

    return () => clearInterval(timer);
  }, [length]);

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 via-white to-red-100">
      <div className="max-w-full md:max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-8">
          ✨ Real Stories
        </h2>
        <p className="mb-12 text-gray-700 px-2 md:px-0 text-sm md:text-base">
          Real stories from people who have donated or received blood to build user trust.
        </p>

        <div className="relative bg-white shadow-lg rounded-xl p-6 md:p-8 mx-2 md:mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-1000 ease-in-out ${
                index === current
                  ? "opacity-100 relative"
                  : "opacity-0 absolute top-0 left-0 w-full"
              }`}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto border-4 border-red-300 object-cover mb-6"
              />
              <p className="italic text-gray-700 mb-6 px-4 md:px-10 text-sm md:text-base">
                &quot;{testimonial.story}&quot;
              </p>
              <h3 className="font-semibold text-red-700 text-lg md:text-xl">
                {testimonial.name}
              </h3>

              {/* Star Ratings */}
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((star, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
