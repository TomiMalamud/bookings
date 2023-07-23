export default function Beds ({beds}) {
    return (
        <div className="py-10">
            <h2 className='text-xl mb-4 font-medium'>¿Dónde van a dormir?</h2>
            <div className='grid grid-cols-2 gap-x-4'>
                {beds.map((bed, index) =>
                    <div key={index} className="border p-4 my-2 rounded-md">
                        <p className="text-md font-semibold">Dormitorio {index + 1}</p>
                        <p className='text-sm'>{bed}</p>
                    </div>)}
            </div>
        </div>)
}