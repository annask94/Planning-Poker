import Image from "next/image";
import CustomBtn from "./CustomBtn";
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
        <Link
          href="
        ./secondPage"
        >
          <CustomBtn text="Start" />
        </Link>
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
