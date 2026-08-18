import { GROUPS } from "../utils/donorUtils";

function BloodFilter({
  activeGroup,
  setActiveGroup,
}) {
  return (
    <div className="filter">

      <span>
        FILTER BY BLOOD GROUP
      </span>

      <div className="chips">

        <button
          className={
            activeGroup === ""
              ? "chip active"
              : "chip"
          }
          onClick={() => setActiveGroup("")}
        >
          All
        </button>

        {GROUPS.map((group) => (
          <button
            key={group}
            className={
              activeGroup === group
                ? "chip active"
                : "chip"
            }
            onClick={() =>
              setActiveGroup(group)
            }
          >
            {group}
          </button>
        ))}

      </div>

    </div>
  );
}

export default BloodFilter;