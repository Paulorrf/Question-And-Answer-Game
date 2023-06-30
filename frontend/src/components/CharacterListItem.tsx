// import React from "react";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

// const ReusableComponent = ({
//   loadingStatus,
//   remainStatusP,
//   points,
//   startStatus,
//   handleIncrease,
//   handleDecrease
// }) => {
//   const canIncrease = (currentPoints, start, remain) => {
//     // Define your logic for checking if increase is possible
//     // Example: return currentPoints < start && remain > 0;
//     return false;
//   };

//   const handlePointIncrease = () => {
//     // Handle point increase logic
//     // Example: handleIncrease(setPoints, remainStatusP);
//   };

//   const handlePointDecrease = () => {
//     // Handle point decrease logic
//     // Example: handleDecrease(setPoints, startStatus?.status?.agility ?? 0);
//   };

//   return (
//     <div>
//       {loadingStatus ? (
//         "loading"
//       ) : (
//         <>
//           {remainStatusP && remainStatusP > 0 && (
//             <>
//               {canIncrease(
//                 points,
//                 startStatus?.status?.agility ?? 0,
//                 remainStatusP
//               ) && (
//                 <button
//                   className="ml-2 text-blue-500"
//                   onClick={handlePointIncrease}
//                   disabled={!remainStatusP || remainStatusP < 1 || loadingStatus}
//                 >
//                   <AiOutlinePlus />
//                 </button>
//               )}
//             </>
//           )}
//           {points > (startStatus?.status?.agility ?? 0) && (
//             <button
//               className="ml-2 text-red-500"
//               onClick={handlePointDecrease}
//             >
//               <AiOutlineMinus />
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ReusableComponent;
