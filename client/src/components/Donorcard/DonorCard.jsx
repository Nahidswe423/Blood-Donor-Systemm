import {
  getEligibility,
} from "../../utils/donorUtils";

import DonorInfo from "./DonorInfo";
import DonorStatus from "./DonorStatus";
import DonorStats from "./DonorStats";
import DonorActions from "./DonorActions";


function DonorCard({
  donor,
  onDonate,
  onDelete,
  showToast,
}) {

  // Check eligibility
  const eligibility =
    getEligibility(donor);


  return (
    <article
      className={
        eligibility.eligible
          ? "donor-card"
          : "donor-card cooldown"
      }
    >

      {/* TOP SECTION */}

      <div className="card-top">

        <span className="blood">
          {donor.blood_group}
        </span>

        <DonorStatus
          eligibility={eligibility}
        />

      </div>


      {/* DONOR INFORMATION */}

      <DonorInfo
        donor={donor}
      />


      {/* DONATION STATISTICS */}

      <DonorStats
        donor={donor}
      />


      {/* BUTTONS */}

      <DonorActions
        donor={donor}
        eligibility={eligibility}
        onDonate={onDonate}
        onDelete={onDelete}
        showToast={showToast}
      />

    </article>
  );
}

export default DonorCard;