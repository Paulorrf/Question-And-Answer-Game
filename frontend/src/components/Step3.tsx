// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { BsArrowRightSquareFill } from "react-icons/bs";
// import { FormData } from "./types";
// import useStore from "@/store/store";
// import questionQuantityStore from "@/store/questionsQuantityStore";
// import setQuestionStore from "@/store/setQuestionStore";
// import tagsStore from "@/store/tagsStore";
// import nextBtnStore from "@/store/nextBtnStore";

// interface DifficultyProp {
//   name: string;
//   brName: string;
// }

// interface QuestionProps {
//   difficulty: string;
//   setDifficulty: React.Dispatch<React.SetStateAction<string>>;
// }

// function difficultyOption(
//   name: string,
//   brName: string,
//   changeDifficulty: any,
//   difficulty: string
// ) {
//   return (
//     <li
//       key={name}
//       className={`${
//         difficulty === name ? "bg-white text-black" : ""
//       } cursor-pointer rounded border border-white px-4 py-2 font-bold child:cursor-pointer child:p-2`}
//       onClick={() => changeDifficulty(name)}
//     >
//       {brName}
//     </li>
//   );
// }

// const Step3 = ({
//   formData,
//   onChange,
//   onNext,
// }: {
//   formData: FormData;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onNext: () => void;
// }) => {
//   const [qntQuestoes, setQntQuestoes] = useState(10);
//   const [genericTags, setGenericTags] = useState<Array<string>>([]);
//   const [specificTags, setSpecificTags] = useState<Array<string>>([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [recSpec, setRecSpec] = useState([]);
//   const [idxGen, setIdxGen] = useState<number>(0);
//   const [idxSpec, setIdxSpec] = useState<number>(0);

//   const quantityOptions = [5, 10, 15, 20];

//   const inputRef = useRef<HTMLInputElement>(null);
//   const inputRef2 = useRef<HTMLInputElement>(null);
//   const inputRefDesc = useRef<HTMLInputElement>(null);
//   const inputRefTitle = useRef<HTMLInputElement>(null);

//   // Zustand values
//   const difficulty = useStore((state) => state.difficulty);
//   const quantity = questionQuantityStore((state) => state.quantity);
//   const tagsGeneric = tagsStore((state) => state.genericTags);
//   const tagsSpec = tagsStore((state) => state.specificTags);

//   // Zustand functions
//   const changeDifficulty = useStore((state) => state.changeDifficulty);
//   const changeQuantity = questionQuantityStore((state) => state.changeQuantity);
//   const changeTagsGeneric = tagsStore((state) => state.changeGeneric);
//   const changeTagsSpec = tagsStore((state) => state.changeSpecific);
//   const changeQuestionSet = setQuestionStore(
//     (state) => state.changeQuestionSet
//   );

//   const isActionEnabled = nextBtnStore((state) => state.isActionEnabled);
//   const performAction = nextBtnStore((state) => state.performAction);

//   console.log("dificuldade");
//   console.log(tagsGeneric);
//   console.log("dificuldade");

//   const difficulties: DifficultyProp[] = [
//     { name: "easy", brName: "Fácil" },
//     { name: "normal", brName: "Normal" },
//     { name: "hard", brName: "Difícil" },
//     { name: "very_hard", brName: "Muito Difícil" },
//     // { name: "expert", brName: "Expert" },
//   ];

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   useEffect(() => {
//     if (inputRef2.current) {
//       inputRef2.current.focus();
//     }
//   }, []);

//   const handleRecommendations = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (genericTags.length === 0 && specificTags.length === 0) {
//       setRecommendations([]);
//       setRecSpec([]);
//       return;
//     }

//     const tagsToSend = [...genericTags, ...specificTags];

//     try {
//       const response = await axios.post("/api/recommendation", {
//         tags: tagsToSend,
//       });
//       const data = response.data;
//       setRecommendations(data.questions);
//       setRecSpec(data.specQuestions);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//     }
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const selectedTags = [...genericTags, ...specificTags];
//     const questionSet = {
//       difficulty,
//       quantity,
//       tags: selectedTags,
//       recommendations,
//       recSpec,
//       description: formData.description,
//       title: formData.title,
//     };
//     changeQuestionSet(questionSet);
//     onNext();
//   };

//   return (
//     <div className="bg-white w-full max-w-md rounded p-6">
//       <form className="w-full max-w-md" onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-2">Customize Your Quiz</h2>
//           <p className="text-gray-600 text-sm">
//             Fill in the details to customize your quiz.
//           </p>
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="title"
//             type="text"
//             name="title"
//             placeholder="Enter the title for your quiz"
//             value={formData.title}
//             onChange={onChange}
//             required
//             ref={inputRefTitle}
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="description"
//             type="text"
//             name="description"
//             placeholder="Enter the description for your quiz"
//             value={formData.description}
//             onChange={onChange}
//             required
//             ref={inputRefDesc}
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="difficulty"
//           >
//             Difficulty
//           </label>
//           <ul className="flex flex-wrap">
//             {difficulties.map((difficultyOption) =>
//               difficultyOption(
//                 difficultyOption.name,
//                 difficultyOption.brName,
//                 changeDifficulty,
//                 difficulty
//               )
//             )}
//           </ul>
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="quantity"
//           >
//             Number of Questions
//           </label>
//           <select
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="quantity"
//             name="quantity"
//             value={quantity}
//             onChange={changeQuantity}
//           >
//             {quantityOptions.map((quantityOption) => (
//               <option key={quantityOption} value={quantityOption}>
//                 {quantityOption}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="tags"
//           >
//             Tags
//           </label>
//           <div className="flex items-center mb-4">
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="generic-tags"
//               type="text"
//               name="genericTags"
//               placeholder="Enter generic tags (e.g., history, science)"
//               value={genericTags[idxGen]}
//               onChange={(e) =>
//                 setGenericTags((prevState) => {
//                   const updatedTags = [...prevState];
//                   updatedTags[idxGen] = e.target.value;
//                   return updatedTags;
//                 })
//               }
//               ref={inputRef}
//             />
//             <button
//               className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={() => setGenericTags((prevState) => [...prevState, ""])}
//             >
//               Add
//             </button>
//           </div>
//           {genericTags.map((tag, index) => (
//             <div className="flex items-center mb-2" key={`gen-${index}`}>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 type="text"
//                 value={tag}
//                 onChange={(e) =>
//                   setGenericTags((prevState) => {
//                     const updatedTags = [...prevState];
//                     updatedTags[index] = e.target.value;
//                     return updatedTags;
//                   })
//                 }
//               />
//               <button
//                 className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
//                 type="button"
//                 onClick={() =>
//                   setGenericTags((prevState) =>
//                     prevState.filter((_, i) => i !== index)
//                   )
//                 }
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div className="flex items-center mt-4">
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="specific-tags"
//               type="text"
//               name="specificTags"
//               placeholder="Enter specific tags (e.g., world war II, organic chemistry)"
//               value={specificTags[idxSpec]}
//               onChange={(e) =>
//                 setSpecificTags((prevState) => {
//                   const updatedTags = [...prevState];
//                   updatedTags[idxSpec] = e.target.value;
//                   return updatedTags;
//                 })
//               }
//               ref={inputRef2}
//             />
//             <button
//               className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={() =>
//                 setSpecificTags((prevState) => [...prevState, ""])
//               }
//             >
//               Add
//             </button>
//           </div>
//           {specificTags.map((tag, index) => (
//             <div className="flex items-center mb-2" key={`spec-${index}`}>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 type="text"
//                 value={tag}
//                 onChange={(e) =>
//                   setSpecificTags((prevState) => {
//                     const updatedTags = [...prevState];
//                     updatedTags[index] = e.target.value;
//                     return updatedTags;
//                   })
//                 }
//               />
//               <button
//                 className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
//                 type="button"
//                 onClick={() =>
//                   setSpecificTags((prevState) =>
//                     prevState.filter((_, i) => i !== index)
//                   )
//                 }
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//             disabled={!isActionEnabled}
//           >
//             Next <BsArrowRightSquareFill className="inline-block" />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step3;
