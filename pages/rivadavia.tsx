import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import Header from '../components/Header'
import { Button } from '../components/ui/button';
import { ChevronDownIcon, ChevronUpIcon, ImageIcon } from '@radix-ui/react-icons';
import Items from '../components/Items';
import Beds from '../components/Beds';
import Location from '../components/Location';
import Info from '../components/Info';

const property = {
    title: 'Casa en Centro de Carlos Paz Pileta',
    location: 'Villa Carlos Paz, Córdoba, Argentina',
    locationDescription: 'Barrio residencial, principalmente habitado por personas de más de 50 años. Tranquilo, con amplia separación entre veredas. Es seguro y se puede estacionar en la calle sin problemas.',
    locationUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.7607430488174!2d-64.4892503246707!3d-31.42071739646025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d665bb602cdfd%3A0x1b4f40ce6b431ac!2sRivadavia%20365%2C%20X5152%20Villa%20Carlos%20Paz%2C%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1690131904725!5m2!1sen!2sar",
    moving: 'Es posible manejarse en cualquier tipo de vehículo, a sólo cinco cuadras se encuentran garitas de colectivo. La casa tiene cochera y además es posible estacionar en la calle, de ambas manos. Siempre hay lugar.',
    beds: ['3 camas marineras', '1 cama de dos plazas y 1 cama marinera', '2 camas marineras', '3 camas marineras'],
    items: ['Vista a las montañas', 'Aire acondicionado', 'Calefacción', 'Cocina y utensillos', 'Wifi', 'Estacionamiento gratis en la propiedad',
        'Pileta De uso privado', 'Se permiten mascotas', 'Cámaras de seguridad en la propiedad'],
    notItems: ['Toallones', 'Juego de Sábanas', 'Shampoo y acondicionador', 'Secador de pelo', 'Lavarropas']
};

const Rivadavia: NextPage = ({ images }: { images: ImageProps[] }) => {
    const router = useRouter()
    const { photoId } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
    const [previousPath, setPreviousPath] = React.useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setPreviousPath(router.asPath);
    }, []);

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    const handleToggleShowMore = () => {
        setShowMore((prevShowMore) => !prevShowMore);
    };

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])

    return (
        <>
            <Head>
                <title>Fotos de Casa Centro Villa Carlos Paz</title>
                <meta
                    property="og:image"
                    content="https://nextjsconf-pics.vercel.app/og-image.png"
                />
                <meta
                    name="twitter:image"
                    content="https://nextjsconf-pics.vercel.app/og-image.png"
                />
            </Head>
            <Header />
            <main className="mx-auto max-w-[1960px] p-7 sm:px-20">
                {photoId && (
                    <Modal
                        images={images}
                        previousPath={previousPath}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                    />
                )}

                <h1 className="text-2xl font-semibold mb-2">{property.title}</h1>
                <h2 className="text-md mb-4">{property.location}</h2>
                    <div className="columns-1  rounded-lg overflow-clip grid grid-cols-3 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
                        {images.map(({ id, public_id, format, blurDataUrl }, index) => (
                            <Link
                                key={id}
                                href={`/rivadavia-fotos`}
                                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                                shallow
                                className="after:content group relative block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                            >
                                <Image
                                    alt="Next.js Conf photo"
                                    className="transform object-cover aspect-video brightness-110 transition will-change-auto group-hover:brightness-90"
                                    style={{ transform: 'translate3d(0, 0, 0)' }}
                                    placeholder="blur"
                                    blurDataURL={blurDataUrl}
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                                    width={720}
                                    height={480}
                                    sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                                />
                                {index === images.length - 1 && (
                <div className="absolute  right-4 bottom-4 flex items-center justify-center z-10">
                  <Link href="/rivadavia-fotos">
                            <Button className='bg-white font-regular border border-slate-900 text-black hover:bg-slate-100 text-md'>
                            <ImageIcon className='mr-2'/>Mostrar todas las fotos</Button>
                        </Link>
                </div>
              )}
                            </Link>
                            
                        ))}
                        
                </div>
                <div className='max-w-3xl divide-y divide-solid'>
                    <div className='flex items-center justify-between'>
                    <div className="my-6">
                        <p className="text-xl font-semibold">Alojamiento entero. Anfitriona: Carina</p>
                        <p>20 huéspedes · 4 dormitorios · 19 camas · 3 baños</p>
                    </div>
                    </div>
                    <div className="py-8">
                        {showMore ? (
                            <p className="prose">
                                Casa con pileta y hermosa vista a toda la ciudad de Villa Carlos Paz.
                                Está equipada y pensada especialmente para grupos grandes de 16 a 20 personas.
                                <br /><br />
                                Queda a 5 cuadras del centro, donde están los mejores restaurantes,
                                y también queda a pocos minutos de la costanera del lago San Roque.
                            </p>
                        ) : (
                            <p className="prose">
                                Casa con pileta y hermosa vista a toda la ciudad de Villa Carlos Paz. Está equipada y pensada especialmente para grupos grandes de 16 a 20 personas.
                                <br /><br />

                                Queda a 5 cuadras del centro, donde están los mejores restaurantes, y también queda a pocos minutos de la costanera del lago San Roque.
                                <br /><br />

                                Tiene estacionamiento para dos autos. El barrio donde está ubicada es residencial, está habitado principalmente por personas de más de 50 años, las calles son anchas para estacionar en ambas manos de forma segura.                            <br /><br />

                                <strong>El alojamiento<br /></strong>
                                La casa en su interior tiene 4 dormitorios, y la distribución de camas es la siguiente:<br />
                                · 3 camas marineras (6 personas de capacidad en total)<br />
                                · 1 cama de dos plazas y 1 cama marinera (duermen 4 personas)<br />
                                · 2 camas marineras (duermen 4 personas)<br />
                                · 3 camas marineras (duermen 6 personas)<br /><br />

                                Tiene Wi-Fi, calefacción, aire acondicionado en cada habitación y living, cocina con sus utensillos.<br /><br />

                                Los demás espacios son comunes y siempre se alquila la totalidad del alojamiento a un grupo familiar - no tenés que compartir espacios con otras personas.<br /><br />
                                <strong>Acceso de los huéspedes<br /></strong>
                                La totalidad de la casa es accesible, exceptuando un departamento ubicado en el patio trasero que permanece cerrado. De ser útil, se puede alquilar por un precio extra. Está al frente de la pileta.
                            </p>
                        )}
                        <Button variant='link' className='-mx-4 mt-7 mb-2 text-md' onClick={handleToggleShowMore}>
                            {showMore ? 'Mostrar más' : 'Mostrar menos'}
                            {showMore ? <ChevronDownIcon className='mx-2' /> : <ChevronUpIcon className='mx-2' />}
                        </Button>
                    </div>
                    <Beds beds={property.beds} />
                    <Items items={property.items} notItems={property.notItems} />
                    <Location location={property.location} locationDescription={property.locationDescription} locationUrl={property.locationUrl} moving={property.moving} />
                    <Info />
                </div>
            </main>
        </>
    )
}

export default Rivadavia

export async function getStaticProps() {
    const results = await cloudinary.v2.search
        .expression(`folder:Rivadavia/*`)
        .sort_by('public_id', 'asc')
        .max_results(6)
        .execute()
    let reducedResults: ImageProps[] = []

    let i = 0
    for (let result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        })
        i++
    }

    const blurImagePromises = results.resources.map((image: ImageProps) => {
        return getBase64ImageUrl(image)
    })
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

    for (let i = 0; i < reducedResults.length; i++) {
        reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
    }

    return {
        props: {
            images: reducedResults,
        },
    }
}