import { features } from "./constants";
import Image from "next/image";
import { FeatureProps } from "@/lib/types/feature";

const FeatureSection = () => {
  return (
    <section id="features">
      <div className="container min-h-screen mx-auto max-w-7xl text-center px-12 py-24 space-y-14">
        <div className="relative flex flex-col gap-2 items-center">
          <Image
            src="/assets/bg-dots.svg"
            alt="bg-dots"
            width={200}
            height={200}
            className="absolute lg:block hidden -top-16 -left-10"
          />
          <h2 className="mb-6 font-sans text-4xl font-bold leading-none tracking-tight sm:text-5xl md:mx-auto">
            Designed for schools like yours
          </h2>
          <p className="text-base md:text-lg">
            The ultimate school management system for teachers and students.
            Quantum is simple, short and attractive.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          {features.map((feature, i) => (
            <Feature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Feature = ({ feature }: { feature: FeatureProps }) => {
  return (
    <div className="max-w-md sm:mx-auto sm:text-center flex flex-col items-center gap-2">
      <div className="shadow rounded-full p-4 bg-background-strong">
        <Image src={feature.image} alt={feature.title} width={50} height={50} />
      </div>
      <div>
        <p className="text-tertiary text-xs font-bold font-sans">
          {feature.bulletin}
        </p>
        <h3 className="mb-3 text-xl font-bold leading-5 font-sans">
          {feature.title}
        </h3>
        <p className="mb-3 text-sm">{feature.description}</p>
      </div>
    </div>
  );
};

export default FeatureSection;
