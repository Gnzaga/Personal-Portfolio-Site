// Contact.js
import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">Contact Me</h1>
        <p className="text-gray-300 text-lg mb-8">
          Have a project in mind or just want to connect? Feel free to reach out
          to me using the form below.
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-300 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 bg-slate-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-slate-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-300 font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-3 py-2 bg-slate-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;