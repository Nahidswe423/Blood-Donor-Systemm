import { useMemo, useState } from "react";

import Header from "./components/Header";
import DonorForm from "./components/DonorForm";
import BloodFilter from "./components/BloodFilter";
import DonorList from "./components/DonorList";

import { useDonors } from "./hooks/useDonors";
import { getEligibility } from "./utils/donorUtils";

import "./App.css";

function App() {

  
  // DONOR API


  const {
    donors,
    loading,
    error,
    addDonor,
    donateBlood,
    deleteDonor,
  } = useDonors();

  
  // FILTER
  

  const [activeGroup, setActiveGroup] =
    useState("");

  
  // TOAST
 

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  
  // FILTERED DONORS
  

  const filteredDonors = useMemo(() => {

    return donors.filter(
      (donor) =>
        !activeGroup ||
        donor.blood_group === activeGroup
    );

  }, [donors, activeGroup]);


  // STATS
 

  const totalDonors = donors.length;

  const eligibleDonors = donors.filter(
    (donor) =>
      getEligibility(donor).eligible
  ).length;

  const totalDonations = donors.reduce(
    (total, donor) =>
      total +
      Number(donor.donation_count || 0),
    0
  );

  return (
    <div className="app">

      {/* TOP NOTICE */}

      <div className="notice">
        DIU BLOOD DONOR REGISTRY • EVERY DROP COUNTS
      </div>

      <div className="container">

        {/* HEADER + STATS */}

        <Header
          totalDonors={totalDonors}
          eligibleDonors={eligibleDonors}
          totalDonations={totalDonations}
        />

        {/* MAIN */}

        <main className="main-grid">

          {/* LEFT */}

          <DonorForm
            onAddDonor={addDonor}
            showToast={showToast}
          />

          {/* RIGHT */}

          <section className="donor-section">

            {/* FILTER */}

            <BloodFilter
              activeGroup={activeGroup}
              setActiveGroup={setActiveGroup}
            />

            {/* API ERROR */}

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            {/* DONOR LIST */}

            <DonorList
              donors={filteredDonors}
              loading={loading}
              onDonate={donateBlood}
              onDelete={deleteDonor}
              showToast={showToast}
            />

          </section>

        </main>

      </div>

      {/* TOAST */}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default App;