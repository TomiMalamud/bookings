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
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                    />
                )}

                    <div className="columns-1  rounded-lg overflow-clip grid grid-cols-3 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
                        {images.map(({ id, public_id, format, blurDataUrl }, index) => (
                            <Link
                                key={id}
                                href={`?photoId=${id}`}
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
                                
                            </Link>
                            
                        ))}
                        
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
        .max_results(40)
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