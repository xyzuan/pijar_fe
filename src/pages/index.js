import { kronaOne, poppins } from "@/constant/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <main className={`flex container max-w-screen-xl flex-col`}>
      <section className="flex flex-row h-screen justify-between items-center">
        <div className="max-w-[560px]">
          <h1 className={`${kronaOne.className} mb-8 leading-10`}>
            <span className="text-white text-5xl font-normal">
              Get Your Self A{" "}
            </span>
            <span className="text-fuchsia-500 text-5xl font-normal">
              Charity Concert
            </span>
            <span className="text-white text-5xl font-normal">
              {" "}
              Ticket Now!
            </span>
          </h1>
          <p>
            Elevate Your Experience, Elevate Lives. Purchase Your Charity
            Concert Ticket Where Music Meets Compassion, and Every Note
            Resonates for a Better Tomorrow!
          </p>
          <button className="p-2 px-4 bg-violet-500 my-8 rounded-full">BUY NOW</button>
        </div>
        <div>
          <Image
            width={497}
            height={497}
            src="/assets/images/landing_hero.png"
          />
        </div>
      </section>

      <section className="flex flex-col items-center">
        <div>
          <h1 className={`${kronaOne.className} mb-8 text-5xl`}>
            Did You Know That
            <span className="rotate-[2deg]">?</span>
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center gap-12">
          <Image
            width={497}
            height={497}
            src="/assets/images/landing_about.png"
          />
          <p className={`text-[20px] ${kronaOne.className}`}>
            If this website is used to encourage our friends who were affected
            by the earthquake that occurred in the south of Malang, East Java
            recently
            <br />
            <br />
            This website aims to provide 100 percent donations from the money
            you use to buy tickets to our music concerts.
            <br />
            <br />
            So what are you waiting for? just order your concert tickets on the
            button below!
          </p>
        </div>
        <button className="p-3 px-7 bg-violet-500 rounded-full">BUY NOW</button>
      </section>
    </main>
  );
}
