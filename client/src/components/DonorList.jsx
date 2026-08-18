import DonorCard from "./DonorCard/DonorCard";

function DonorList({
  donors,
  loading,
  onDonate,
  onDelete,
  showToast,
}) {

  if (loading) {
    return (
      <div className="empty">
        Loading donors...
      </div>
    );
  }


  if (donors.length === 0) {
    return (
      <div className="empty">
        No donors found for this blood group.
      </div>
    );
  }


  return (
    <div className="donor-grid">

      {donors.map((donor) => (

        <DonorCard
          key={donor.id}
          donor={donor}
          onDonate={onDonate}
          onDelete={onDelete}
          showToast={showToast}
        />

      ))}

    </div>
  );
}

export default DonorList;