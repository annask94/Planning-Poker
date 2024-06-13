import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="main_content grid grid-cols- 1 gap-16 max-w-5xl items-center mx-6 md:grid-cols-2 md:mx-auto">
      <section className="main_text flex flex-col mt-12 md:block">
        <h1 className="text-2xl font-medium mb-4 text-center md:text-left md:mb-12 md:text-5xl">
          Planning Poker with the help of AI
        </h1>
        <p className="text-xl font-light mb-12 text-center md:text-left md:mb-24 md:text-2xl">
          Enter task details, choose your estimate card, and with a click,
          receive not just your estimation but also an AI-backed analysis.
        </p>
        <section className="flex flex-wrap md:justify-start justify-center items-center gap-3">
          <Link
            href="
          ./estimate"
          >
            <button
              className="btn_component text-xl md:text-2xl px-10 py-1 rounded-md font-medium text-white hover:opacity-70"
              type="button"
            >
              Single user
            </button>
          </Link>
          <Link
            href="
          ./team"
          >
            <button
              className="btn_component text-xl md:text-2xl px-10  py-1 ml-5 rounded-md font-medium text-white hover:opacity-70"
              type="button"
            >
              Team
            </button>
          </Link>
        </section>
      </section>
      <section className="main_img">
        <Image
          src="/planningIllustrationOrange.svg"
          height={500}
          width={500}
          alt="Simple vector illustration of two people planning some task"
        />
      </section>
    </div>
  );
};

export default Hero;
