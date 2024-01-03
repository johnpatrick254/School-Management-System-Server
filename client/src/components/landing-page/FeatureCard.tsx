import Image from "next/image";
import { FC } from "react";

export type FeatureCardProps = {
    img: string;
    bulletin: string
    title: string;
    desc: string;
}
export const FeatureCard: FC<FeatureCardProps> = ({ img, title, desc, bulletin }) => {
    return <div className='w-full p-2 w-full flex flex-col gap-3'>
        <div className='relative w-full h-1/2'>
            <Image
                src={img}
                fill={true}
                alt="Feature Image"
            />
        </div>
        <div className='w-full flex flex-col justify-start text-left'>

            <div className='font-medium pb-2 text-fuchsia-600'>{bulletin}</div>
            <div className='text-lg font-medium text-black'>{title}</div>
            <div className='text-lg font-medium py-3 text-gray-700'>{desc}</div>
        </div>
        <a href="/" className='font-medium pb-2 text-fuchsia-600 rounded-sm'>Try Demo</a>
    </div>

}
