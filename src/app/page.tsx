import Image from "next/image";
import Hero from "@/src/components/Hero";



export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        
        <Hero value={0} redFillPercentage={0}/>
        
        
        
      </div>
    </main>
  );
}


// import Image from "next/image";
// import Hero from "@/src/components/Hero";

// export default function Home() {
//   return (
//     <main className="relative min-h-screen bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
//       <div className="max-w-7xl w-full">
//         <Hero value={0} redFillPercentage={0} />
//       </div>
//     </main>
//   );
// }
