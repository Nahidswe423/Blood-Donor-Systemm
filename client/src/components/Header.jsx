import Stats from "./Stats";

function Header({
  totalDonors,
  eligibleDonors,
  totalDonations,
}) {
  return (
    <header className="hero">

      <div className="eyebrow">
        UNIVERSITY BLOOD DONOR SYSTEM
      </div>

      <h1>
        Every donor has a heartbeat
        <br />
        waiting to save another.
      </h1>

      <p className="hero-text">
        Register donors, find the right blood group,
        track donation history, and know who is ready
        to donate right now.
      </p>

      <Stats
        totalDonors={totalDonors}
        eligibleDonors={eligibleDonors}
        totalDonations={totalDonations}
      />

    </header>
  );
}

export default Header;