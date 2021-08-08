import Head from 'next/head'
import ActivityCard from '../components/ActivityCard'
import Banner from '../components/Banner'
import CityCard from '../components/CityCard'
import Footer from '../components/Footer'
import Header from '../components/Header'
import OutdoorCard from '../components/OutdoorCard'

export default function Home({exploreData,activityData}) {
  return (
    <div className="">
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Banner/>
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData?.map(({img, distance, location})=>(
            <CityCard
              key={img}
              img={img}
              distance={distance}
              location={location}
            />
          ))
          }
          </div>
        </section>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
          {activityData?.map(({img, title})=>(
            <ActivityCard
              key={img}
              img={img}
              title={title}
            />
          ))
          }
          </div>
        </section>
        <OutdoorCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wish;ists curated by Airbnb"
          buttonText="Get Inspired"
        />
        
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp').
  then(
    (res) => res.json()
  )
  const activityData = await fetch('https://links.papareact.com/zp1').
  then(
    (res) => res.json()
  )
  return {
    props: {
      exploreData,
      activityData
    }
  }
}