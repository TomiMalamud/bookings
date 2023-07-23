export default function Location({location, locationDescription, locationUrl, moving}) {
    return (
    <div className='py-10'>
        <h2 className='text-xl mb-6 font-medium'>¿Dónde van a estar?</h2>
        <iframe
            src={locationUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="pt-8">
            <h3 className="font-medium text-md mb-4">{location}</h3>
            <p>{locationDescription}</p>
            <br />
            <h3 className="font-medium text-md my-3">Cómo moverse</h3>
            <p>{moving}</p>
        </div>
    </div>
)}