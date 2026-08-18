import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/donors";

export const useDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  // LOAD DONORS
  
  const loadDonors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      setDonors(response.data);
    } catch (err) {
      console.error(err);

      setError("Could not load donor data.");
    } finally {
      setLoading(false);
    }
  };

  // Load when app starts
  useEffect(() => {
    loadDonors();
  }, []);

  
  // ADD DONOR
  
  const addDonor = async (donorData) => {
    try {
      await axios.post(API_URL, donorData);

      await loadDonors();

      return {
        success: true,
        message: "Donor registered successfully.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to register donor.",
      };
    }
  };

 
  // DONATE BLOOD
  
  const donateBlood = async (id) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}/donate`
      );

      await loadDonors();

      return {
        success: true,
        message:
          response.data.message ||
          "Donation recorded successfully.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Donation failed.",
      };
    }
  };

  
  // DELETE DONOR
  
  const deleteDonor = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${id}`
      );

      await loadDonors();

      return {
        success: true,
        message:
          response.data.message ||
          "Donor removed successfully.",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message: "Failed to remove donor.",
      };
    }
  };

  return {
    donors,
    loading,
    error,
    loadDonors,
    addDonor,
    donateBlood,
    deleteDonor,
  };
};