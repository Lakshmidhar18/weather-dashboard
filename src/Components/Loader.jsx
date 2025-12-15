// import React from "react";
// import { MagnifyingGlass } from "react-loader-spinner";

// function Loader() {
//   return (
//     <div style={styles.overlay}>
//       <div style={styles.box}>
//         <MagnifyingGlass
//           visible={true}
//           height="90"
//           width="90"
//           ariaLabel="magnifying-glass-loading"
//           glassColor="#c0efff"
//           color="#4154ffff"
//         />

//         <p style={styles.text}>Fetching weather...</p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     zIndex: 9999,
//     background: "rgba(0, 0, 0, 0.3)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   box: {
//     display: "flex",
//     flexDirection: "column",   
//     alignItems: "center",
//   },

//   text: {
//     marginTop: "5px",
//     color: "#fff",
//     fontSize: "12px",
//     letterSpacing: "1px",
//   },
// };

// export default Loader;











import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

function Loader() {
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <MagnifyingGlass
          visible={true}
          height="90"
          width="90"
          ariaLabel="magnifying-glass-loading"
          glassColor="#c0efff"
          color="#4154ffff"
        />

        <p style={styles.text}>Fetching weather...</p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    display: "flex",
    flexDirection: "column",   
    alignItems: "center",
  },

  text: {
    marginTop: "5px",
    color: "#fff",
    fontSize: "12px",
    letterSpacing: "1px",
  },
};

export default Loader;
