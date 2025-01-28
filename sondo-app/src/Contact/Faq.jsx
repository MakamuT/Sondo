import React, { useState } from 'react';
import "./faq.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

function Faq() {
  // State to track the currently expanded FAQ index
const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle the expanded FAQ
const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
};// If the FAQ is already expanded, collapse it; otherwise, activate it

  // List of FAQs with questions and answers
const faqs = [
    {
    question: "What is this website about?",
    answer: "This website helps users find and book mobility aids like wheelchairs at malls in advance.",
    },
    {
    question: "How do I book a wheelchair?",
    answer: "Search for your preferred mall, click on it, and follow the booking process on the next page.",
    },
    {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking from the bookings page or contact support for assistance.",
    },
    {
    question: "Is there a cost associated with bookings?",
    answer: "Our service is free of charge, but some malls may have rental fees for mobility aids.",
    },
    {
    question: "How can I contact support?",
    answer: "Visit the Contact Us page for our email address and phone number. We are here to help!",
    },
];

return (
    <div className="faq-page">

    <Header />
    <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {/* Map through the FAQs and render each one */}
        {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
              {/* FAQ question with a click handler to toggle the answer */}
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                {/* Icon to indicate whether the FAQ is expanded or collapsed */}
                <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>
              {/* Render the answer if the FAQ is currently expanded */}
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
        ))}
        </div>
    </div>
    <Footer />
    </div>
);
}

export default Faq;
