// import React, { useState, useMemo, useEffect } from "react";

// const App = () => {
//   const fullData = useMemo(
//     () => [
//       { name: "Amy Wong", job: "Engineer" },
//       { name: "Bender Bending Rodriguez", job: "Robot" },
//       { name: "Fry", job: "Delivery Boy" },
//       { name: "Leela", job: "Captain" },
//       { name: "Zoidberg", job: "Doctor" },
//       { name: "Hermes Conrad", job: "Bureaucrat" },
//       { name: "Scruffy", job: "Janitor" },
//     ],
//     []
//   );

//   const [displayData, setDisplayData] = useState(fullData);

//   const handleFilter = (e, grid) => {
//     const filterData = e.detail?.ZGData;
//     if (!filterData) return;

//     const { fieldIndex, selectValue } = filterData;

//     if (!selectValue || selectValue.length === 0) {
//       setDisplayData(fullData);

//       return;
//     } else {
//       const newData = fullData.filter((row) =>
//         selectValue.includes(row[fieldIndex])
//       );
//       setDisplayData(newData);
//     }

//   };

//   useEffect(() => {
//     const grid = document.querySelector("zing-grid");
//     if (grid) {
//       grid.addEventListener("column:filter", handleFilter);
//     }
//     return () => {
//       if (grid) {
//         grid.removeEventListener("column:filter", (e) => handleFilter(e, grid));
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Event Output:</h2>
//       <div id="result">N/A</div>
//       <zing-grid
//         id="myGrid"
//         caption="ZingGrid Dependent Filters"
//         filter
//         filter-menu-areas="both"
//         data={JSON.stringify(displayData)}
//       ></zing-grid>
//     </div>
//   );
// };
// export default App;
