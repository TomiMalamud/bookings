import React, { Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";
import Items from "../../components/Items";
import Beds from "../../components/Beds";
import Info from "../../components/Info";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";
import MobileSlider from "../../components/MobileSlider";
import { useRouter } from "next/router";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";

const Location = dynamic(() => import("../../components/Location"), {
  loading: () => <p>Cargando...</p>
});

type PropertyType = {
  title: string;
  location: string;
  locationDescription: string;
  locationUrl: string;
  moving: string;
  beds: string[];
  maxCapacity: number;
  items: string[];
  notItems: string[];
  shortDescription?: string;
  completeDescription?: string;
};

type Props = {
  property: PropertyType;
  images: ImageProps[];
};

export const propertiesData = {
  donizetti: {
    id: "donizetti",
    title: "Casa en Carlos Paz Pileta",
    location: "Villa Carlos Paz, Córdoba, Argentina",
    locationDescription:
      "Barrio residencial, principalmente habitado por personas de más de 50 años. Tranquilo, con amplia separación entre veredas. Es seguro y se puede estacionar en la calle sin problemas.",
    locationUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.950226609956!2d-64.52481312467091!3d-31.415497396207904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d661c2009e00d%3A0x487c9b60d157875!2sDonizetti%20260%2C%20Villa%20Carlos%20Paz%2C%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1693860248413!5m2!1sen!2sar",
    moving:
      "Es posible manejarse en cualquier tipo de vehículo, a sólo cinco cuadras se encuentran garitas de colectivo. La casa tiene cochera y además es posible estacionar en la calle, de ambas manos. Siempre hay lugar.",
    beds: [
      "1 cama de dos plazas y 1 cama de una plaza",
      "1 cama de dos plazas y 1 cama de una plaza",
      "2 camas de una plaza (en el living)",
      "1 cama de dos plazas"
    ],
    maxCapacity: 10,
    items: [
      "Vista a las montañas",
      "Aire acondicionado",
      "Calefacción",
      "Cocina y utensillos",
      "Wifi",
      "Estacionamiento para 2 vehículos",
      "Pileta de uso privado",
      "Se permiten mascotas",
      "Cámaras de seguridad en la propiedad"
    ],
    notItems: [
      "Toallones",
      "Juego de Sábanas",
      "Shampoo y acondicionador",
      "Secador de pelo",
      "Lavarropas"
    ],
    shortDescription: `Casa con pileta y hermosa vista a las sierras de Villa Carlos Paz. Está equipada y pensada especialmente para grupos grandes de hasta 10 personas.

    Queda a 7 minutos del centro viejo, y a pocos minutos del río Cabalango. La casa está rodeada de almacenes y carnicerías.`,
    completeDescription: `
    Tiene estacionamiento para dos autos. El barrio donde está ubicada es residencial, alejada del ruido de avenidas. Ideal para grupos jóvenes, o familias que disfruten del río.

    **El alojamiento**
    La casa en su interior tiene 3 dormitorios, con el living también habilitado para dormir. La distribución de camas es la siguiente:
    - 1 cama de dos plazas y 1 cama de una plaza
    - 1 cama de dos plazas y 1 cama de una plaza
    - 2 camas de una plaza (en el living)
    - 1 cama de dos plazas

    Tiene Wi-Fi, calefacción, aire acondicionado en 2 de las habitaciones habitaciones y en el living, cocina con sus utensillos.

    Los demás espacios son comunes y siempre se alquila la totalidad del alojamiento a un grupo familiar - no tenés que compartir espacios con otras personas.`
  },
  rivadavia: {
    id: "Rivadavia",
    title: "Casa en Centro de Carlos Paz Pileta",
    location: "Villa Carlos Paz, Córdoba, Argentina",
    locationDescription:
      "Barrio residencial, principalmente habitado por personas de más de 50 años. Tranquilo, con amplia separación entre veredas. Es seguro y se puede estacionar en la calle sin problemas.",
    locationUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.7607430488174!2d-64.4892503246707!3d-31.42071739646025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d665bb602cdfd%3A0x1b4f40ce6b431ac!2sRivadavia%20365%2C%20X5152%20Villa%20Carlos%20Paz%2C%20C%C3%B3rdoba!5e0!3m2!1sen!2sar!4v1690131904725!5m2!1sen!2sar",
    moving:
      "Es posible manejarse en cualquier tipo de vehículo, a sólo cinco cuadras se encuentran garitas de colectivo. La casa tiene cochera y además es posible estacionar en la calle, de ambas manos. Siempre hay lugar.",
    beds: [
      "3 camas marineras",
      "1 cama de dos plazas y 1 cama marinera",
      "2 camas marineras",
      "3 camas marineras"
    ],
    maxCapacity: 20,
    items: [
      "Vista a las montañas",
      "Aire acondicionado",
      "Calefacción",
      "Cocina y utensillos",
      "Wifi",
      "Estacionamiento gratis en la propiedad",
      "Pileta De uso privado",
      "Se permiten mascotas",
      "Cámaras de seguridad en la propiedad"
    ],
    notItems: [
      "Toallones",
      "Juego de Sábanas",
      "Shampoo y acondicionador",
      "Secador de pelo",
      "Lavarropas"
    ],
    shortDescription: `Casa con pileta y hermosa vista a toda la ciudad de Villa Carlos Paz. Está equipada y pensada especialmente para grupos grandes de 16 a 20 personas.

    Queda a 5 cuadras del centro, donde están los mejores restaurantes, y también queda a pocos minutos de la costanera del lago San Roque.`,
    completeDescription: `
    Tiene estacionamiento para dos autos. El barrio donde está ubicada es residencial, está habitado principalmente por personas de más de 50 años, las calles son anchas para estacionar en ambas manos de forma segura.

    **El alojamiento**
    La casa en su interior tiene 4 dormitorios, y la distribución de camas es la siguiente:
    - 3 camas marineras (6 personas de capacidad en total)
    - 1 cama de dos plazas y 1 cama marinera (duermen 4 personas)
    - 2 camas marineras (duermen 4 personas)
    - 3 camas marineras (duermen 6 personas)

    Tiene Wi-Fi, calefacción, aire acondicionado, cocina con sus utensillos.

    Los demás espacios son comunes y siempre se alquila la totalidad del alojamiento a un grupo familiar - no tenés que compartir espacios con otras personas.

    **Acceso de los huéspedes**
    La totalidad de la casa es accesible, exceptuando un departamento ubicado en el patio trasero que permanece cerrado. De ser útil, se puede alquilar por un precio extra. Está al frente de la pileta.`
  }
};

const ShowMoreToggle = ({ showMore, handleToggleShowMore }) => (
  <button
    className="mt-7 mb-2 text-md underline"
    onClick={handleToggleShowMore}
  >
    <span className="flex items-center">
      {showMore ? "Mostrar menos" : "Mostrar más"}
      {showMore ? (
        <ChevronUpIcon className="mx-2 h-4 w-4" />
      ) : (
        <ChevronDownIcon className="mx-2  h-4 w-4" />
      )}
    </span>
  </button>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(propertiesData).flatMap((slug) => {
    const property = propertiesData[slug];
    if (property.images) {
      return property.images.map((image, index) => {
        return { params: { slug, photoId: index.toString() } };
      });
    }
    return [{ params: { slug, photoId: "0" } }];
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  // Fetch property details
  const property = propertiesData[params.slug as string];

  // Fetch image details
  const results = await cloudinary.v2.search
    .expression(`folder:${property.id}/*`)
    .sort_by("public_id", "asc")
    .max_results(40)
    .execute();

  let reducedResults: ImageProps[] = [];
  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);
  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      property,
      images: reducedResults
    }
  };
};

const PropertyPage: NextPage<Props> = ({ property, images }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [showMore, setShowMore] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const handleToggleShowMore = () =>
    setShowMore((prevShowMore) => !prevShowMore);

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId && lastViewedPhotoRef.current) {
      // Check if lastViewedPhotoRef.current exists
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }

    return () => {
      // Cleanup function to remove the scroll effect when the component is unmounted
      if (lastViewedPhotoRef.current) {
        lastViewedPhotoRef.current = null;
      }
    };
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>{property.title}</title>
      </Head>
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="w-full h-[302px] bg-gray-300" />
          </div>
        }
      >
        <MobileSlider
          images={images}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </Suspense>
      <main className="mx-auto max-w-[1960px] p-7 sm:px-20">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}

        <h1 className="text-2xl font-semibold mb-2">{property.title}</h1>
        <h2 className="text-md mb-4">{property.location}</h2>
        <hr className="sm:hidden" />
        <div className="hidden columns-1 rounded-lg overflow-clip sm:grid grid-cols-3 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images
            .slice(0, 6)
            .map(({ id, public_id, format, blurDataUrl }, index) => (
              <Link
                key={id}
                href={`${slug}/?photoId=${id}`}
                as={`${slug}?photoId=${id}`}
                ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                shallow
                className="after:content group relative block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Image
                  alt="Casa en Centro de Carlos Paz con pileta"
                  className="transform object-cover aspect-video brightness-110 transition will-change-auto group-hover:brightness-90"
                  style={{ transform: "translate3d(0, 0, 0)" }}
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
                {index === 5 && (
                  <button
                    type="button"
                    className="absolute right-6 bottom-6 flex justify-center z-10 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 hover:bg-gray-100"
                  >
                    <PhotoIcon className="h-4 w-4 mr-2"></PhotoIcon>
                    Mostrar todas las fotos
                  </button>
                )}
              </Link>
            ))}
        </div>
        <div className="max-w-3xl divide-y divide-solid">
          <div className="flex items-center justify-between">
            <div className="my-6">
              <p className="text-xl font-semibold">
                Alojamiento entero. Anfitriona: Carina
              </p>
              <p>
                {property.maxCapacity} huéspedes · {property.beds.length}{" "}
                dormitorios · 19 camas · 3 baños
              </p>
            </div>
          </div>
          <div className="py-8">
            <div
              className="prose whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: property.shortDescription.replace(
                  /\*\*(.*?)\*\*/g,
                  "<strong>$1</strong>"
                )
              }}
            />
            {showMore && (
              <div
                className="prose whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: property.completeDescription.replace(
                    /\*\*(.*?)\*\*/g,
                    "<strong>$1</strong>"
                  )
                }}
              />
            )}
            <ShowMoreToggle
              showMore={showMore}
              handleToggleShowMore={handleToggleShowMore}
            />
          </div>

          <Beds beds={property.beds} />
          <Items items={property.items} notItems={property.notItems} />
          <Location
            location={property.location}
            locationDescription={property.locationDescription}
            locationUrl={property.locationUrl}
            moving={property.moving}
          />
          <Info />
        </div>
      </main>
    </>
  );
};

export default PropertyPage;
