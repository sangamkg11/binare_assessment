// import { auth } from "./firebase";
// import { motion } from "framer-motion";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Search from "./pages/Search";
// import Profile from "./pages/Profile";
// import Navbar from "./components/Navbar";
// const [user, setUser] = useState(null);
// import { useEffect, useState } from "react";

// function App() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   // useEffect(() => {
//   //   window.addEventListener("online", () => setOnline(true));
//   //   window.addEventListener("offline", () => setOnline(false));
//   // }, []);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);
//   // #to protect routes
//   const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged((u) => {
//   //     setUser(u);
//   //   });
//   //   return () => unsubscribe();
//   // }, []);
//   useEffect(() => {
//     const guest = localStorage.getItem("guest");

//     if (guest) {
//       setUser({ name: "Guest" });
//     }

//     const unsubscribe = auth.onAuthStateChanged((u) => {
//       if (u) setUser(u);
//     });

//     return () => unsubscribe();
//   }, []);
//   return (
//     <>
//       {!isOnline && <div className="offline-banner">You are offline</div>}
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route
//           path="/"
//           element={
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//               <Home />
//             </motion.div>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

import { auth } from "./firebase";
import { motion } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // ✅ Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ✅ Auth + Guest login
  useEffect(() => {
    const guest = localStorage.getItem("guest");

    if (guest) {
      setUser({ name: "Guest" });
    }

    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!isOnline && <div className="offline-banner">You are offline</div>}

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Home />
            </motion.div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
