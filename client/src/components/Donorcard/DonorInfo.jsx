function DonorInfo({ donor }) {
  return (
    <div className="donor-info">

      <h3>{donor.name}</h3>

      <p>
        📍 {donor.area}
      </p>

      <p>
        ☎ {donor.phone}
      </p>

    </div>
  );
}

export default DonorInfo;