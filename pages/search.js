import { PrinterIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";

function Search({searchResults}) {
    console.log(searchResults)
    const router = useRouter()
    const { location, startDate, endDate, noOfGuests } = router.query
    const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
    const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')
    const dateRange = `${formattedStartDate} - ${formattedEndDate} for ${noOfGuests}`
    return (
        <div>
            <Header placeholder={`${location} | ${formattedStartDate} | ${formattedEndDate} | ${noOfGuests}`} />
            <main className="flex">
                <section className='flex-grow pt-14 px-6'>
                    <p className="text-xs">
                        {dateRange}
                    </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="chip">Cancellation Flexibility</p>
                        <p className="chip">Type of Place</p>
                        <p className="chip">Price</p>
                        <p className="chip">Rooms and Beds</p>
                        <p className="chip">More Filters</p>
                    </div>

                    <div className="flex flex-col">
                    {
                        searchResults.map(({img, location, title, description, star, price, total}) =>(
                            <InfoCard 
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                            />
                        ))
                    }
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Search;

export async function getServerSideProps(){
    const searchResults = await fetch('https://links.papareact.com/isz').then(
        res=>res.json());
        return {
            props: {
                searchResults
            }
}
}