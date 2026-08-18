import { formatDate } from "../../utils/donorUtils";

function DonorStats({ donor }) {
  return (
    <div className="card-stats">

      <div className="card-stat">

        <strong>
          {donor.donation_count || 0}
        </strong>

        <small>
          DONATIONS
        </small>

      </div>

      <div className="card-stat">

        <strong className="date">
          {formatDate(
            donor.last_donation_date
          )}
        </strong>

        <small>
          LAST DONATION
        </small>

      </div>

    </div>
  );
}

export default DonorStats;