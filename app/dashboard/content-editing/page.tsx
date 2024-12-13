// 'use client'
// import React, { useState } from 'react'
// import OpenAI from "openai";
// const openai = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Set your API key in .env.local
//     dangerouslyAllowBrowser: true 
// });
// const page = () => {
//     const [content, setContent] = useState("");
//     const [showChatForm, setShowChatForm] = useState(false); // Toggle AI chat form
//     const [tags, setTags] = useState<string[]>([]); // Stores all tags
//     const [inputValue, setInputValue] = useState<string>(""); // Input value
//     const [response, setResponse] = useState<string>(""); // OpenAI response
//     const [loading, setLoading] = useState<boolean>(false);
//     const placeholder = "Write something, or press 'space' for AI, '/' for commands...";

//     const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
//         const inputContent = e.currentTarget.textContent ||"";
//         console.log(inputContent)
//         setContent(inputContent);

//         // Check if the first character is a space
//         if (inputContent.startsWith("/")) {
//             console.log('ok')
//         setShowChatForm(true); // Show AI chat form
//         } else {
//         setShowChatForm(false); // Hide AI chat form
//         console.log('no ok')
//         }
//     };


//     // Handle Enter key press to add a tag
//   const handleKeyDown = async  (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && inputValue.trim()) {
//         e.preventDefault();
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 {
//                     role: "user",
//                     content: inputValue,
//                 },
//             ],
//         });
        
//         console.log(completion.choices[0].message);
//     }
//   };
//   return (
//     <div className="">
//         <h1>Editor</h1>
//         <h2>{content}</h2>
//         <div
//         contentEditable="true"
//         onInput={(e)=>handleInput(e)}
//         suppressContentEditableWarning={true}
//         // className="border border-gray-300 rounded-md p-3 min-h-[40px] text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         // placeholder="Write something, or press 'space' for AI chat..."
//         >
//         {/* {content} */}
//       </div>
//         {/* AI Chat Form */}
//         {showChatForm && (
//         <div className="mt-4 p-3 border rounded-md bg-gray-100">
//           <p className="text-gray-600">🤖 AI Chat Form Activated</p>
//           <input
//             type="text"
//             onChange={(e)=>setInputValue(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask your AI assistant..."
//             className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>
//       )}
//       {loading ? "Loading..." : "Send"}
//       {/* Response Display */}
//       <div className="mt-4 p-2 bg-gray-100 rounded-md">
//         <strong>Response:</strong>
//         <p>{response || "No response yet."}</p>
//       </div>
//     </div>
//   )
// }

// export default page


import ContentEditor from "./ContentEditor";
export default function Home() {
  return (
    <div>
      <h1>Custom Editor</h1>
      <ContentEditor />
    </div>
  );
}