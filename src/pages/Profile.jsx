// export default function Profile() {
//   const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

//   return (
//     <div>
//       <h2>Profile</h2>
//       {watchlist.map((m) => (
//         <p key={m.id}>{m.title}</p>
//       ))}
//     </div>
//   );
// }

export default function Profile() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const history = JSON.parse(localStorage.getItem("history")) || [];

  return (
    <div>
      <h2>Watchlist</h2>
      {watchlist.map((m) => (
        <p key={m.id}>{m.name}</p>
      ))}

      <h2>History</h2>
      {history.map((m) => (
        <p key={m.id}>{m.name}</p>
      ))}
    </div>
  );
}
