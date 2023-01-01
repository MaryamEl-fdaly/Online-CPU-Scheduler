export const Row = ({ data }) => {
    return (
        <div className="flex border-collapse">
            <p className="w-32 text-sm border-collapse text-center py-2 border-x-2 border-x-gray-100 font-bold font-sans">{data.pID}</p>
            <p className="w-32 text-sm border-collapse text-center py-2 border-x-2 border-x-gray-100 font-bold font-sans">{data.aT}</p>
            <p className="w-32 text-sm border-collapse text-center py-2 border-x-2 border-x-gray-100 font-bold font-sans">{data.bT}</p>
            <p className="w-32 text-sm border-collapse text-center py-2 border-x-2 border-x-gray-100 font-bold font-sans">{data.ft}</p>
            <p className="w-32 text-sm border-collapse text-center py-2 border-x-2 border-x-gray-100 font-bold font-sans">{data.tat}</p>
            <p className="w-32 text-sm border-collapse text-center py-2 border-x-2 border-x-gray-100 font-bold font-sans">{data.wt}</p>
        </div>
    )
}