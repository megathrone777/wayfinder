// import React from "react";

// import {
//   cardClass,
//   cardHeadingClass,
//   priceClass,
//   rowClass,
//   mutedClass,
//   thumbClass,
//   tagsClass,
//   tagClass,
//   ratingClass,
// } from "./Results.css";

// import type { TStayCardProps } from "./Results.types";

// const StayCard: React.FC<TStayCardProps> = ({ hotels }) => {
//   const [hotel] = hotels;

//   if (!hotel) return null;

//   const { city, name, nightlyUsd, rating, tags, thumbnailUrl, type } = hotel;

//   return (
//     <div className={cardClass}>
//       <p className={cardHeadingClass}>Stay</p>

//       <div className={rowClass}>
//         <img
//           alt={name}
//           className={thumbClass}
//           src={thumbnailUrl}
//         />

//         <div>
//           <div className={rowClass}>
//             <p>{name}</p>
//             <p className={ratingClass}>★ {rating}</p>
//           </div>

//           <p className={mutedClass}>
//             {city} · {type}
//           </p>

//           <ul className={tagsClass}>
//             {tags.map((tag: string) => (
//               <li
//                 className={tagClass}
//                 key={tag}
//               >
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <p className={priceClass}>
//         ${nightlyUsd} <span className={mutedClass}>/ night</span>
//       </p>
//     </div>
//   );
// };

// export { StayCard };
