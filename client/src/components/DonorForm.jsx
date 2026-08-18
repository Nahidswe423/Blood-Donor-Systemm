import { useState } from "react";
import { GROUPS } from "../utils/donorUtils";

function DonorForm({ onAddDonor, showToast }) {
  const [form, setForm] = useState({
    name: "",
    blood_group: "",
    phone: "",
    area: "",
  });

  const [error, setError] = useState("");


  // FORM CHANGE
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ADD DONOR
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.blood_group ||
      !form.phone ||
      !form.area
    ) {
      setError("Please fill in every field.");
      return;
    }

    const result = await onAddDonor(form);

    if (!result.success) {
      setError(result.message);
      return;
    }

    showToast(result.message);

    setForm({
      name: "",
      blood_group: "",
      phone: "",
      area: "",
    });
  };

  return (
    <section className="form-card">

      <div className="form-eyebrow">
        REGISTER
      </div>

      <h2>Become a donor</h2>

      <form onSubmit={handleSubmit}>

        <label>
          Full name

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Nahid Uddin"
          />
        </label>

        <label>
          Blood group

          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
          >
            <option value="">
              Select group
            </option>

            {GROUPS.map((group) => (
              <option
                key={group}
                value={group}
              >
                {group}
              </option>
            ))}
          </select>
        </label>

        <label>
          Phone

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
          />
        </label>

        <label>
          Area

          <input
            type="text"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="e.g. Dhamrai, Dhaka"
          />
        </label>

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-btn"
        >
          Register as donor
        </button>

      </form>

    </section>
  );
}

export default DonorForm;