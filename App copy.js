import React, { useState, useMemo, useEffect, useRef } from "react";

const App = () => {
  /**
   * Memoized full dataset to prevent unnecessary re-creation
   * of data array on each render.
   */
  const fullData = useMemo(
    () => [
      { name: "Amy Wong", job: "Engineer" },
      { name: "Bender Bending Rodriguez", job: "Robot" },
      { name: "Fry", job: "Delivery Boy" },
      { name: "Leela", job: "Captain" },
      { name: "Zoidberg", job: "Doctor" },
      { name: "Hermes Conrad", job: "Bureaucrat" },
      { name: "Scruffy", job: "Janitor" },
    ],
    []
  );

  /**
   * State to manage the displayed (filtered) dataset.
   * Initially set to full dataset.
   */
  const [displayData, setDisplayData] = useState(fullData);

  /**
   * Reference to the ZingGrid component in the DOM.
   * Used for interacting with the grid dynamically.
   */
  const gridRef = useRef(null);

  /**
   * Prevents unnecessary filter updates that could lead to an infinite loop.
   */
  const isUpdatingFilterMenu = useRef(false);

  /**
   * Function to update the filter dropdown options dynamically
   * based on the currently displayed data.
   */
  const updateFilterMenus = () => {
    const grid = gridRef.current;
    if (!grid) return; // Ensure grid exists before trying to update

    // Get unique names and job roles from the dataset
    const availableNames = [...new Set(fullData.map((row) => row.name))];
    const availableJobs = [...new Set(fullData.map((row) => row.job))];

    // Update filter options in ZingGrid
    grid.filterMenuColumn("name", { selectItems: availableNames });
    grid.filterMenuColumn("job", { selectItems: availableJobs });
  };

  /**
   * Event handler for filter changes in the ZingGrid component.
   * Filters the dataset based on user selection in the grid's filter menu.
   */
  const handleFilter = (e) => {
    console.log("Filter Event Triggered:", e.detail);

    const grid = gridRef.current;
    if (!grid || isUpdatingFilterMenu.current) return; // Prevent unnecessary updates

    const filterData = e.detail?.ZGData;
    if (!filterData) return; // Exit if no filter data is available

    let selectValue = filterData.selectValue || [];

    // If no selection is made, reset to full dataset
    if (selectValue.length === 0) {
      setDisplayData(fullData);
      return;
    }

    // Apply filtering based on the selected column (name or job)
    const newData = fullData.filter((row) =>
      filterData.fieldIndex === "name"
        ? selectValue.includes(row.name)
        : selectValue.includes(row.job)
    );

    // Update the displayed data
    setDisplayData(newData);

    // Prevent unnecessary updates & refresh the filter menu
    isUpdatingFilterMenu.current = true;
    setTimeout(() => {
      updateFilterMenus();
      isUpdatingFilterMenu.current = false;
    }, 20);
  };

  /**
   * Effect Hook: Adds an event listener to handle column filtering
   * when the component is mounted, and removes it on unmount.
   */
  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("column:filter", handleFilter);
    }

    return () => {
      if (grid) {
        grid.removeEventListener("column:filter", handleFilter);
      }
    };
  }, []);

  return (
    <div>
      <h2>Event Output:</h2>
      <div id="result">N/A</div>

      {/* ZingGrid component with filtering enabled */}
      <zing-grid
        id="myGrid"
        caption="ZingGrid Dependent Filters"
        filter
        filter-menu-areas="selectbox"
        ref={gridRef}
        data={displayData}
      ></zing-grid>
    </div>
  );
};

export default App;
