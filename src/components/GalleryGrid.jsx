import React, { useMemo } from 'react'

export const GalleryGrid = ({ data }) => {


    const arr = useMemo(() => {
     
        const arr = [];
        let start = 0;
        for (let i = 0; i < Math.ceil(data.length / 5); i++) {
            console.log("run");
            arr.push(data.slice(start, start + 5))
            start = start + 5;
        }

        return arr;
    }, [data])

    return (
        <div className="max-w-screen-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                {arr.map((chunk, i) =>
                    i % 2 === 0 ? <BentoGrid key={i} chunk={chunk} isReversed={false} /> : <BentoGrid key={i} chunk={chunk} isReversed={true} />
                )}
            </div>
        </div>
    )
}

const BentoGrid = ({ chunk, isReversed }) => {
    const len = chunk.length;
    return (
        <>
            <div className={`col-span-2 sm:col-span-1 md:${isReversed ? "col-span-1" : "col-span-2"} bg-gray-50 h-auto md:h-full flex flex-col`}>
                <GridCard image={chunk[0]} grow={true} />
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
                {len >= 2 && <GridCard image={chunk[1]} mb={true} />}
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                    {len >= 3 && <GridCard image={chunk[2]} />}
                    {len >= 4 && <GridCard image={chunk[3]} />}
                </div>
            </div>
            <div className={`col-span-2 sm:col-span-1 md:${isReversed ? "col-span-2" : "col-span-1"} bg-gray-50 h-auto md:h-full flex flex-col`}>
                {len === 5 && <GridCard image={chunk[4]} grow={true} />}
            </div>
        </>
    )
}

const GridCard = ({ image, mb, grow }) => {
    console.log(image);
    return (
        <>
            <div className={`group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 ${mb ? "mb-4" : ""} ${grow ? "flex-grow" : ""}`}>
                <img src={image.url} alt="img" className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h5 className="z-10 text-lg font-medium text-white absolute bottom-0 left-0 p-2 md:text-xl">{image.caption}</h5>
            </div>
        </>
    )
}