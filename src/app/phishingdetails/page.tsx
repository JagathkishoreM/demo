import Image from "next/image";
import DetailsHero from "@/src/app/phishingdetails/DetailsHero";


export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        
        <DetailsHero value={0} redFillPercentage={0}/>
        
        
      </div>
    </main>
  );
}
