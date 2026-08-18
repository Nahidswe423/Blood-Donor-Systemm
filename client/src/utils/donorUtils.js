export const GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const COOLDOWN_DAYS = 120;

export const getEligibility = (donor) => {
  if (!donor.last_donation_date) {
    return {
      eligible: true,
      remaining: 0,
    };
  }

  const last = new Date(donor.last_donation_date);
  const today = new Date();

  last.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const daysSince = Math.floor(
    (today - last) / (1000 * 60 * 60 * 24)
  );

  if (daysSince < COOLDOWN_DAYS) {
    return {
      eligible: false,
      remaining: COOLDOWN_DAYS - daysSince,
    };
  }

  return {
    eligible: true,
    remaining: 0,
  };
};

export const formatDate = (date) => {
  if (!date) {
    return "Never donated";
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};