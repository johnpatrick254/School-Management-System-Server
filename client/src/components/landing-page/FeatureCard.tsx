import Image from "next/image";
import { FC } from "react";
import TransitionContainer from "../shared/TransitionContainer";

export type FeatureCardProps = {
    img: string;
    number: number;
    bulletin: string
    title: string;
    desc: string;
}
export const FeatureCard: FC<FeatureCardProps> = ({ number, img, title, desc, bulletin }) => {
    return <div className={`w-full h-96 flex flex-col gap-6 items-left 
    ${(number % 2 !== 0) ? 'flex-col-reverse' : ''}
    lg:flex-row lg:justify-between
    `}>
        {(number % 2 !== 0) &&
            <TransitionContainer
                variant='LEFT'
                className='relative w-full h-3/4 '
                key={number}
            >
                <Image
                    src={img}
                    fill={true}
                    alt="Feature Image"

                />
            </TransitionContainer>
        }
        <TransitionContainer
            variant={number % 2 !== 0 ? "RIGHT" : "LEFT"}
            className={`w-full flex flex-col justify-start text-left
                        lg:flex-col}
                     `}
        >
            <div className='font-medium pb-2 text-tertiary-foreground'>{bulletin}</div>
            <div className='text-xl font-bold'>{title}</div>
            <div className='py-4 '><p>{desc}</p></div>
            <a href="/" className='font-medium pb-2 text-tertiary-foreground rounded-sm'>Try Demo!</a>

        </TransitionContainer>

        {/* <div className="w-full text-left">
        </div> */}
        {(number % 2 == 0) &&
            <TransitionContainer
                variant='RIGHT'
                className='relative w-full h-3/4 '
                key={number}
            >

                <Image
                    src={img}
                    fill={true}
                    alt="Feature Image"

                />

            </TransitionContainer>
        }
    </div >

}
