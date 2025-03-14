'use client';
import React, { useState } from 'react';
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile'); // State to manage active section
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [profile, setProfile] = useState({
    firstName: 'Dilip kumar',
    lastName: 'Reddy',
    email: 'mdilip@gmail.com',
    phone: 'xxxxxxxxxx',
    username: 'dilip27m',
    country: 'United Kingdom',
    city: 'Leeds, East London',
    street: 'ERT 2354',
    nearby: 'ERT 2354',
    pincode: 'Axxxxxx',
  });
  const [profileImage, setProfileImage] = useState(null); // State to manage profile image

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='#DCD6F7'> {/* Dark Navy Blue background */}
      <Navbar />
      <div className="min-h-screen p-6 pt-24"> {/* Removed bg-gray-100 */}
        {/* Glassy Container */}
        <div className="w-[80%] mx-auto bg-[#F4EEFF] backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-lg shadow-lg p-8 min-h-[700px] border border-[#DCD6F7] border-opacity-30">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#424874]">Account Settings</h1>
            {activeSection !== 'orders' && activeSection !== 'delete' && (
              <button
                className="text-[#424874] hover:text-[#A6B1E1]"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            )}
          </div>

          {/* Sidebar and Main Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 pr-6 border-r border-[#DCD6F7]">
              <ul className="space-y-4">
                <li
                  className={`text-[#424874] hover:text-[#A6B1E1] cursor-pointer ${
                    activeSection === 'profile' ? 'text-[#A6B1E1] font-semibold' : ''
                  }`}
                  onClick={() => setActiveSection('profile')}
                >
                  My Profile
                </li>
                <li
                  className={`text-[#424874] hover:text-[#A6B1E1] cursor-pointer ${
                    activeSection === 'orders' ? 'text-[#A6B1E1] font-semibold' : ''
                  }`}
                  onClick={() => setActiveSection('orders')}
                >
                  Orders
                </li>
                <li
                  className={`text-[#424874] hover:text-[#A6B1E1] cursor-pointer ${
                    activeSection === 'address' ? 'text-[#A6B1E1] font-semibold' : ''
                  }`}
                  onClick={() => setActiveSection('address')}
                >
                  Address
                </li>
                <li
                  className={`text-[#424874] hover:text-red-600 cursor-pointer ${
                    activeSection === 'delete' ? 'text-red-600 font-semibold' : ''
                  }`}
                  onClick={() => setActiveSection('delete')}
                >
                  Delete Account
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 pl-6">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-[#424874]">My Profile</h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-[#DCD6F7] rounded-full flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-[#424874]">DK</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#424874]">{profile.firstName} {profile.lastName}</h3>
                        <p className="text-[#424874]">{profile.username}</p>
                      </div>
                      {isEditing && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="mb-8 p-6 rounded-lg border border-[#DCD6F7] shadow-sm bg-[#F4EEFF] bg-opacity-50">
                    <h2 className="text-xl font-semibold mb-4 text-[#424874]">Personal Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#424874]">First Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                          />
                        ) : (
                          <p className="mt-1 text-[#424874]">{profile.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#424874]">Last Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                          />
                        ) : (
                          <p className="mt-1 text-[#424874]">{profile.lastName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#424874]">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                          />
                        ) : (
                          <p className="mt-1 text-[#424874]">{profile.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#424874]">Phone</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                          />
                        ) : (
                          <p className="mt-1 text-[#424874]">{profile.phone}</p>
                        )}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-[#424874]">Username</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                          />
                        ) : (
                          <p className="mt-1 text-[#424874]">{profile.username}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Orders Section */}
              {activeSection === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#424874]">Orders</h2>
                  <p className="text-[#424874]">No orders found.</p>
                </div>
              )}

              {/* Address Section */}
              {activeSection === 'address' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#424874]">Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#424874]">Country</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="country"
                          value={profile.country}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                        />
                      ) : (
                        <p className="mt-1 text-[#424874]">{profile.country}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#424874]">City/State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="city"
                          value={profile.city}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                        />
                      ) : (
                        <p className="mt-1 text-[#424874]">{profile.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#424874]">Street/Door.No</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="street"
                          value={profile.street}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                        />
                      ) : (
                        <p className="mt-1 text-[#424874]">{profile.street}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#424874]">Near by</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="nearby"
                          value={profile.nearby}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                        />
                      ) : (
                        <p className="mt-1 text-[#424874]">{profile.nearby}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#424874]">Pincode</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="pincode"
                          value={profile.pincode}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg border-[#DCD6F7]"
                        />
                      ) : (
                        <p className="mt-1 text-[#424874]">{profile.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Delete Account Section */}
              {activeSection === 'delete' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#424874]">Delete Account</h2>
                  <p className="text-[#424874]">Are you sure you want to delete your account? This action cannot be undone.</p>
                  <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;