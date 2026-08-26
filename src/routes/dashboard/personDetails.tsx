// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { getPersonById } from "@/data/movies";
// import { getImageURL } from "@/lib/functions";
// import type { PersonDetailsProps } from "@/types/movies.type";

// const PersonDetails = () => {
//   const { id } = useParams();

//   const [person, setPerson] = useState<PersonDetailsProps | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchPerson = async () => {
//       const data = await getPersonById(id);
//       setPerson(data);
//     };

//     fetchPerson();
//   }, [id]);

//   if (!person) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="person-details-page">
//       <div className="person-image">
//         {person.profile_path ? (
//           <img
//             src={getImageURL(person.profile_path , "md")}
//             alt={person.name}
//           />
//         ) : (
//           <div className="person-image-placeholder">
//             {person.name?.charAt(0)}
//           </div>
//         )}
//       </div>

//       <div className="person-info">
//         <h1>{person.name}</h1>

//         <p>
//           {person.biography || "No biography available."}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PersonDetails;