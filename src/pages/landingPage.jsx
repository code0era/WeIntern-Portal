import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import Autoplay from "embla-carousel-autoplay"
import companies from "../data/companies.json";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import faqs from "../data/faq.json";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-sky-100 flex flex-col gap-14 sm:gap-24 py-16 sm:py-24">

      {/* HERO */}
      <section className="text-center px-4">
        <h1 className="flex flex-col items-center justify-center font-extrabold
          text-slate-900 text-4xl sm:text-6xl lg:text-8xl tracking-tight">
          Find Your Dream Job
          <span className="flex items-center gap-3 sm:gap-6 mt-3">
            and get
            <img
              src="/logo.png"
              className="h-14 sm:h-24 lg:h-32 rounded-full bg-white p-2 shadow-md"
              alt="WeIntern"
            />
          </span>
        </h1>

        <p className="text-slate-700 sm:mt-5 text-sm sm:text-xl max-w-2xl mx-auto">
          Explore thousands of internships or find the perfect candidate
        </p>
      </section>

      {/* CTA BUTTONS */}
      <div className="flex gap-6 justify-center">
        <Link to="/jobs">
          <Button className="bg-sky-500 hover:bg-sky-600 text-white px-6">
            Find Jobs
          </Button>
        </Link>

        <Link to="/post-job">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-6">
            Post A Job
          </Button>
        </Link>
      </div>

      {/* DIVIDER */}
      {/* <div className="w-full h-px bg-sky-300 my-2" /> */}

      {/* COMPANY CAROUSEL */}
      <section className="bg-sky-50 py-3">
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full">
          <CarouselContent className="flex gap-10 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-8 sm:h-10 object-contain mx-auto opacity-90"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* DIVIDER */}
      {/* <div className="w-full h-px bg-sky-300 my-2" /> */}

      {/* BANNER */}
      <img
        src="/we.png"
        className="w-full max-h-[520px] object-cover"
        alt="WeIntern Banner"
      />

      {/* CARDS */}
      <section className=" max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <Card className="bg-white border border-sky-200 shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-slate-900 font-bold text-xl">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700">
            Search and apply for internships, track applications, and grow your career.
          </CardContent>
        </Card>

        <Card className="bg-white border border-sky-200 shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-slate-900 font-bold text-xl">
              For Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700">
            Post internships, manage applicants, and hire top talent easily.
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}

      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="mb-4 rounded-lg border border-sky-200 bg-white shadow-sm"
            >
              <AccordionTrigger
                className="bg-sky-200 hover:bg-sky-300
                text-slate-900 font-semibold px-5 py-4 rounded-t-lg"
              >
                {faq.question}
              </AccordionTrigger>

              <AccordionContent
                className="bg-sky-50 text-slate-700 px-5 py-4"
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

    </main>
  )
}

export default LandingPage
