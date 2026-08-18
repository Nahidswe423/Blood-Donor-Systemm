function DonorStatus({ eligibility }) {
  return (
    <div className="donor-status">

      <span
        className={
          eligibility.eligible
            ? "status eligible"
            : "status blocked"
        }
      >
        {eligibility.eligible
          ? "Eligible"
          : "Not Eligible"}
      </span>

      {!eligibility.eligible && (
        <p className="cooldown-text">
          Eligible again in{" "}
          <strong>
            {eligibility.remaining}
          </strong>{" "}
          days
        </p>
      )}

    </div>
  );
}

export default DonorStatus;