import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticatedPostRequest } from "../../utils/ServerHelpers";
import { toast } from "react-toastify";
import Layout from "../../layouts/Layout";
import TextInput from "../shared/TextInput";

const ArtistRegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stageName: "",
    artistImage: "",
    bio: "",
    socialLinks: {
      twitter: "",
      instagram: "",
      youtube: "",
      soundcloud: "",
      spotify: "",
      website: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.socialLinks) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { stageName, artistImage } = formData;

    if (!stageName || !artistImage) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await authenticatedPostRequest("/artist/create", formData);

      if (response && response.message) {
        toast.success(response.message);
        navigate("/profile");
      } else {
        toast.error(response?.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error submitting artist registration.");
      console.error("Artist registration error:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 shadow-lg rounded-xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Register as an Artist</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Stage Name *</label>
            <input
              type="text"
              name="stageName"
              value={formData.stageName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
              required
            />

          </div>

          <div>
            <label className="block mb-1 font-medium">Artist Image URL *</label>
            <input
              type="text"
              name="artistImage"
              value={formData.artistImage}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["twitter", "instagram", "youtube", "soundcloud", "spotify", "website"].map((platform) => (
              <div key={platform}>
                <label className="block mb-1 capitalize">{platform}</label>
                <input
                  type="text"
                  name={platform}
                  value={formData.socialLinks[platform]}
                  onChange={handleChange}
                  placeholder={`https://${platform}.com/yourprofile`}
                  className="w-full p-2 bg-gray-800 rounded border border-gray-600 focus:outline-none focus:border-orange-500"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ArtistRegistrationPage;
