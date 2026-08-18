function DonorActions({
  donor,
  eligibility,
  onDonate,
  onDelete,
  showToast,
}) {

  const handleDonate = async () => {

    const result = await onDonate(
      donor.id
    );

    showToast(result.message);
  };


  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${donor.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    const result = await onDelete(
      donor.id
    );

    showToast(result.message);
  };


  return (
    <div className="actions">

      <button
        className="donate-btn"
        disabled={!eligibility.eligible}
        onClick={handleDonate}
      >
        {eligibility.eligible
          ? "Donate blood"
          : "Not available"}
      </button>


      <button
        className="remove-btn"
        onClick={handleDelete}
      >
        Remove
      </button>

    </div>
  );
}

export default DonorActions;