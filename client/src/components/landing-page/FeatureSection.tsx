import { FC } from "react";
import { features } from "./constants";
import { FeatureCard } from "./FeatureCard";
import TransitionContainer from "../shared/TransitionContainer";

interface FeatureSectionProps { }

const FeatureSection: FC<FeatureSectionProps> = ({ }) => {
  return <TransitionContainer
      variant="TOP"
      key={"feature"}
      delay={2000}
      className="h-max">
      <div id="features" className="h-max flex flex-col gap-10 py-7 ">
        <h2 className='text-tertiary-foreground text-2xl text-center font-bold '>Features</h2>
      </div>
      <div className="w-full flex flex-col gap-y-5 px-5 ">
        {
          features.map((feature, i) => {
            return <FeatureCard
              key={i}
              number={i}
              title={feature.title}
              bulletin={feature.bulletin}
              desc={feature.desc}
              img={feature.img}
            />
          }
          )
        }
      </div>
    </TransitionContainer>
};

export default FeatureSection;
