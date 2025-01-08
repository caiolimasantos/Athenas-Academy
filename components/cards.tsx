import { database } from '@/database'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
export default function Cards() {
    return (
        <div className='flex justify-center my-5'>
            <div className="grid gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {database.cardsHome.map((callout) => (
                    <div className="flex max-w-[22rem] flex-col overflow-hidden rounded-xl bg-white shadown-md bg-clip-border ' hover:-translate-y-1 ease-linear duration-200 hover:shadow-inner text-icon" key={callout.title}>
                        <Link href={callout.link}>
                            <div className={`flex justify-center my-3 overflow-hidden bg-transparent rounded-none shadow-none bg-clip-border mx-auto ease-in-out`} key={callout.title}>
                                <FontAwesomeIcon icon={callout.icons} className='w-[50px] h-[50px]' />

                            </div>
                            <div className="text-center" key={callout.title}>
                                <h4 className={`block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-icon`} >
                                    {callout.title}
                                </h4>
                            </div>
                            <div className='text-justify' key={callout.subtitle}>
                                <p className="block mt-2 font-sans text-xl p-2 antialiased font-semibold leading-relaxed text-black">
                                    {callout.subtitle}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
    )
}
