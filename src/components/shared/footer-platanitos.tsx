import Image from "next/image";

export default function FooterPlatanitos() {
    return (
        <footer className="h-22 mt-auto w-full bg-white flex justify-center items-center">
            <div>
                <span className="flex flex-row gap-1 justify-center items-center text-sm text-[#333] font-extralight">
                    Hecho con  
                        <Image 
                            src={'https://d13xymm0hzzbsd.cloudfront.net/1/20201103/16044439156299.svg'}
                            alt="platanitos"
                            width={10}
                            height={12.5}
                        />
                     por Platanitos
                </span>
            </div>
        </footer>
    )
}