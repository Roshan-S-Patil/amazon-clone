import React from 'react'
import { SiRazorpay } from "react-icons/si";
import { RiVisaLine } from "react-icons/ri";
import { GrPaypal } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
<footer className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-wrap justify-between">
        
        {/* Company Info */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <p>Contact Us</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/roshanspatil" target='_blank' rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://x.com/X_RoshanPatil?t=mOtc-qPaG1jmiHG0Vq3o1w&s=08" target='"_blank' rel="noopener noreferrer"><BsTwitterX /></a>
          </div>
          <p className="text-gray-700 hover:text-gray-900">contact.roshanpatil@gmail.com</p>
          <p className="text-gray-700 hover:text-gray-900">+91 8208934551</p>
        </div>

        {/* Customer Service */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Help & FAQs</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Shipping & Delivery</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Returns & Refunds</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Order Tracking</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-4">Shop</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Categories</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">New Arrivals</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Best Sellers</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Gift Cards</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Privacy Policy</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Terms & Conditions</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 hover:text-gray-900">Cookies Policy</a></li>
          </ul>
        </div>

        {/* Payment Methods & Newsletter */}
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-2">Payment Methods</h4>
          <div className="flex items-center space-x-4 mb-2">
          <SiRazorpay />
          <RiVisaLine className='size-8' />
          <GrPaypal />
          </div>
          <p className="text-gray-700 mb-4">Secure Payment</p>
          
 
        </div>
      </div>

      <div className="text-center mt-10 pt-4 border-t border-gray-300">
        <p className="text-gray-600">© 2024 Clone. All rights reserved.</p>
        <p className="text-gray-600">Site by [Clone]</p>
        <p className="text-gray-500 mt-2">Designed and developed by <a href="https://www.linkedin.com/in/roshanspatil" className="text-gray-700 hover:text-gray-900" target="_blank" rel="noopener noreferrer">Roshan Patil</a></p>
      </div>
    </footer>
  )
}

export default Footer
