function Stats({
  totalDonors,
  eligibleDonors,
  totalDonations,
}) {
  return (
    <div className="stats">

      <div className="stat">
        <span>{totalDonors}</span>
        <small>REGISTERED DONORS</small>
      </div>

      <div className="stat">
        <span>{eligibleDonors}</span>
        <small>ELIGIBLE NOW</small>
      </div>

      <div className="stat">
        <span>{totalDonations}</span>
        <small>TOTAL DONATIONS</small>
      </div>

    </div>
  );
}

export default Stats;