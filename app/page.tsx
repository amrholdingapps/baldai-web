"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { testimonials } from "@/constants/testimonials"
import { faqItems } from "@/constants/faq"

const purple = "#381c59"
const purpleSoft = "rgba(56,28,89,0.7)"
const purpleMuted = "rgba(56,28,89,0.5)"
const purpleSubtle = "rgba(56,28,89,0.05)"
const purpleBorder = "rgba(56,28,89,0.2)"
const purpleAccent = "#9553f9"

function CategoryTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="w-3 h-3 rounded-full" style={{ background: purpleAccent }} />
      <span className="text-[16px] font-medium tracking-[0.16px]" style={{ color: purpleAccent }}>
        {label}
      </span>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[32px] font-semibold leading-none tracking-[-0.64px]"
      style={{ color: purple }}
    >
      {children}
    </h2>
  )
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[18px] font-normal leading-[1.4] tracking-[0.18px]"
      style={{ color: purpleSoft }}
    >
      {children}
    </p>
  )
}

function IconPlusCircle() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="9.5" r="9" stroke="white" strokeWidth="1" />
      <path d="M9.5 5.5V13.5M5.5 9.5H13.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
        stroke={purple}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PrimaryButton({
  children,
  outline,
  icon,
}: {
  children: React.ReactNode
  outline?: boolean
  icon?: React.ReactNode
}) {
  if (outline) {
    return (
      <button
        type="button"
        className="flex items-center justify-center gap-[10px] px-[25px] py-[16px] rounded-[12px] border text-[16px] font-medium tracking-[0.16px] whitespace-nowrap w-[70vw] self-start md:w-auto"
        style={{ borderColor: purpleBorder, color: purple }}
      >
        {children}
        {icon}
      </button>
    )
  }
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-[5px] px-[25px] py-[16px] rounded-[12px] text-[16px] font-medium tracking-[0.16px] text-white w-[256px]"
      style={{ background: purple, boxShadow: "0px 8px 21px rgba(56,28,89,0.25)" }}
    >
      {children}
      {icon}
    </button>
  )
}

function ProgressDots({
  count,
  active = 0,
  onDotClick,
}: {
  count: number
  active?: number
  onDotClick?: (index: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-[4px] w-full h-[10px]">
      {Array.from({ length: count }).map((_, i) => (
        <button
          type="button"
          key={i}
          className="rounded-full transition-all duration-200"
          style={{
            width: 4,
            height: i === active ? 10 : 6,
            background: i === active ? purple : purpleBorder,
          }}
          onClick={() => onDotClick?.(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

function useCarouselTracker(itemCount: number, gap = 10) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || !el.children.length) return
    const card = el.children[0] as HTMLElement
    const cardWidth = card.offsetWidth
    const index = Math.round(el.scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(index, itemCount - 1))
  }, [itemCount, gap])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollTo = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el || !el.children.length) return
      const card = el.children[0] as HTMLElement
      const cardWidth = card.offsetWidth
      el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" })
    },
    [gap]
  )

  return { scrollRef, activeIndex, scrollTo }
}

function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <div
      className="flex-shrink-0 aspect-[343/600] w-[calc(100vw-30px)] md:w-[340px] lg:w-[360px] flex flex-col justify-between snap-center overflow-hidden"
      style={{ background: purpleSubtle }}
    >
      <div className="px-[35px] pt-[35px] pb-[15px] flex flex-col gap-[5px]">
        <h3 className="text-[18px] font-medium tracking-[0.18px]" style={{ color: purple }}>
          {title}
        </h3>
        <p
          className="text-[18px] font-normal leading-[1.4] tracking-[0.18px]"
          style={{ color: purpleSoft }}
        >
          {description}
        </p>
      </div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={686}
        height={900}
        className="w-full h-auto mt-auto"
        sizes="(min-width: 1024px) 360px, (min-width: 768px) 340px, calc(100vw - 30px)"
      />
    </div>
  )
}

function TrackingCard({
  title,
  description,
  imageSrc,
  imageSrcMd,
  imageSrcMdWidth,
  imageSrcMdHeight,
  imageAlt,
  className,
  imageClassName,
}: {
  title: string
  description: string
  imageSrc: string
  imageSrcMd?: string
  imageSrcMdWidth?: number
  imageSrcMdHeight?: number
  imageAlt: string
  className?: string
  imageClassName?: string
}) {
  return (
    <div
      className={`w-full flex flex-col justify-between overflow-hidden ${className ?? ""}`}
      style={{ background: purpleSubtle }}
    >
      <div className="px-[35px] pt-[35px] pb-[15px] flex flex-col gap-[5px]">
        <h3 className="text-[18px] font-medium tracking-[0.18px]" style={{ color: purple }}>
          {title}
        </h3>
        <p
          className="text-[18px] font-normal leading-[1.4] tracking-[0.18px]"
          style={{ color: purpleSoft }}
        >
          {description}
        </p>
      </div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={690}
        height={900}
        className={`w-full h-auto mt-auto ${imageSrcMd ? "md:hidden" : ""} ${imageClassName ?? ""}`}
        sizes="(min-width: 768px) 44vw, calc(100vw - 30px)"
      />
      {imageSrcMd && (
        <Image
          src={imageSrcMd}
          alt={imageAlt}
          width={imageSrcMdWidth ?? 1104}
          height={imageSrcMdHeight ?? 1050}
          className={`hidden md:block w-full h-auto mt-auto ${imageClassName ?? ""}`}
          sizes="(min-width: 768px) 44vw, calc(100vw - 30px)"
        />
      )}
    </div>
  )
}

const brands = [
  { name: "Capillus", img: "capillus.png" },
  { name: "Forest & Shore", img: "forest_and_shore.png" },
  { name: "Happy Head", img: "happy_head.png" },
  { name: "Hims", img: "hims.png" },
  { name: "Intelligent", img: "intelligent.png" },
  { name: "Nizoral", img: "nizoral.png" },
  { name: "Nutrafol", img: "nutrafol.png" },
  { name: "Rogaine", img: "rogaine.png" },
  { name: "Sons", img: "sons.png" },
  { name: "Viviscal", img: "viviscal.png" },
]

const routineItems = [
  {
    title: "Medications catalog",
    desc: "Minoxidil, Finasteride, Dutasteride",
    icon: "/images/redesign/routine bullets/routine_medication.png",
  },
  {
    title: "Supplemental Treatments",
    desc: "Rosemary oil, ketaconazole shampoo, vitamins and supplements",
    icon: "/images/redesign/routine bullets/routine_treatments.png",
  },
  {
    title: "Procedures",
    desc: "Microneedling (Derma roller and pen), Red light Therapy, PRP, ",
    icon: "/images/redesign/routine bullets/routine_procedures.png",
  },
  {
    title: "Medical Data",
    desc: "Lab results (Ferritin, Hormones), Planned Transplant dates",
    icon: "/images/redesign/routine bullets/routine_data.png",
  },
]

const techCards = [
  {
    title: "Perfect Angle Guidance",
    description:
      "The app's auto-alignment system ensures the correct head position for 100% consistent shots.",
    imageSrc: "/images/redesign/angle_guidence.jpg",
  },
  {
    title: "Norwood Scale Analysis",
    description: "Instantly identify your hair loss stage based on clinical medical standards.",
    imageSrc: "/images/redesign/norwood_scale_analysis.jpg",
  },
  {
    title: "Density Heatmaps",
    description:
      "See a color-coded map of your scalp density to understand where you're losing the most.",
    imageSrc: "/images/redesign/density_heatmaps.jpg",
  },
  {
    title: "Everything in One Place",
    description:
      "All your scans, treatments, scores and medical history — organized in a single timeline.",
    imageSrc: "/images/redesign/everything.jpg",
  },
  {
    title: "Privacy & Security",
    description:
      "Your data is encrypted and stored securely. We never share your photos or personal information.",
    imageSrc: "/images/redesign/privacy.jpg",
  },
]

const FAQ_VISIBLE_COUNT = 5

const menuItems: { label: string; target: string; type: "scroll" | "link"; muted?: boolean }[] = [
  { label: "Home", target: "top", type: "scroll", muted: true },
  { label: "Atlas DNA Kit", target: "/atlas-dna", type: "link" },
  { label: "Technology", target: "technology", type: "scroll" },
  { label: "Tracker", target: "progress", type: "scroll" },
  { label: "Treatments", target: "calendar", type: "scroll" },
  { label: "Testimonials", target: "testimonials", type: "scroll" },
  { label: "FAQ", target: "faq", type: "scroll" },
  { label: "Blog", target: "/blog", type: "link" },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(-1)
  const [showAllFaq, setShowAllFaq] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isReviewsAutoplayPaused, setIsReviewsAutoplayPaused] = useState(false)
  const techCarousel = useCarouselTracker(techCards.length)
  const reviewsCarousel = useCarouselTracker(testimonials.length, 16)

  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollUpAccumulator = useRef(0)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      if (delta > 0) {
        scrollUpAccumulator.current = 0
        setHeaderVisible(false)
      } else {
        scrollUpAccumulator.current += Math.abs(delta)
        if (scrollUpAccumulator.current >= 15) {
          setHeaderVisible(true)
        }
      }

      if (currentY <= 0) setHeaderVisible(true)
      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuItemClick = useCallback((item: (typeof menuItems)[number]) => {
    setMenuOpen(false)
    if (item.type === "scroll") {
      setTimeout(() => {
        if (item.target === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    } else {
      setTimeout(() => {
        window.location.href = item.target
      }, 300)
    }
  }, [])

  const handleHorizontalCarouselWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    event.currentTarget.scrollLeft += event.deltaY
  }, [])

  useEffect(() => {
    if (isReviewsAutoplayPaused || testimonials.length <= 1) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const autoplayId = window.setInterval(() => {
      reviewsCarousel.scrollTo((reviewsCarousel.activeIndex + 1) % testimonials.length)
    }, 4500)

    return () => window.clearInterval(autoplayId)
  }, [isReviewsAutoplayPaused, reviewsCarousel, reviewsCarousel.activeIndex])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-30 bg-white transition-transform duration-300 px-4 py-[23px] md:px-6 lg:px-8"
        style={{ transform: headerVisible || menuOpen ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="w-full max-w-[1240px] mx-auto flex items-center justify-between gap-[24px]">
          <Image src="/images/redesign/logo.png" alt="Hairloss AI" width={124} height={25} />
          <nav className="hidden md:flex items-center gap-[14px] lg:gap-[22px]">
            {menuItems
              .filter((item) => item.target !== "top")
              .map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="text-[13px] lg:text-[14px] font-regular tracking-[0.13px] lg:tracking-[0.14px] whitespace-nowrap"
                  style={{ color: item.muted ? purpleMuted : purple }}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </button>
              ))}
          </nav>
          <a
            href="https://apps.apple.com/us/app/hairloss-ai-scan-hair-health/id6563141135"
            className="hidden lg:flex items-center justify-center rounded-[10px] px-[20px] py-[12px] text-[14px] font-medium tracking-[0.14px] text-white whitespace-nowrap"
            style={{ background: purple }}
          >
            Download app
          </a>
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Image src="/images/redesign/menu.png" alt="" width={24} height={18} />
          </button>
        </div>
      </header>
      <div className="h-[71px] md:h-[76px]" />

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 md:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        <div className="flex items-center justify-between px-4 py-[23px]">
          <Image src="/images/redesign/logo.png" alt="Hairloss AI" width={124} height={25} />
          <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Image src="/images/redesign/menu_close.png" alt="" width={24} height={24} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-[12px] -mt-[23px]">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="text-[18px] font-semibold tracking-[-0.36px] py-[12px]"
              style={{ color: item.muted ? purpleMuted : purple }}
              onClick={() => handleMenuItemClick(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="px-[15px] md:px-6 lg:px-8 max-w-[1240px] mx-auto flex flex-col gap-[150px] md:gap-[170px] pb-0 mt-[72px] md:mt-[52px]">
        {/* Hero */}
        <section className="flex flex-col gap-[25px] lg:gap-[35px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.03fr_0.97fr] gap-[25px] lg:gap-[36px] lg:items-end">
            <div className="flex flex-col gap-[25px]">
              <h1
                className="text-[32px] lg:text-[56px] font-semibold leading-none tracking-[-0.64px] lg:tracking-[-1.12px] md:w-[70%] lg:w-auto"
                style={{ color: purple }}
              >
                Regain Control of Your Hair with
                <span style={{ color: purpleMuted }}> AI-Powered Precision</span>
              </h1>
              <p
                className="text-[18px] font-normal leading-[1.4] tracking-[0.18px] md:w-[70%] lg:w-auto lg:max-w-[560px]"
                style={{ color: purpleSoft }}
              >
                The first mobile app designed for professional-grade alopecia tracking. Scan your
                hair, discover effective treatments, and witness real progress through data.
              </p>
            </div>
            <div className="w-full aspect-[343/300] lg:aspect-[560/520] overflow-hidden relative">
              <Image
                src="/images/redesign/main_image_m.jpg"
                alt="Hair scan preview"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
              />
            </div>
            <div className="flex flex-col gap-[20px] lg:max-w-[560px]">
              <p
                className="text-[16px] font-light leading-[1.4] tracking-[0.16px] md:w-[70%] lg:w-auto"
                style={{ color: purple }}
              >
                The world&apos;s most accurate AI-powered hair scanner and analysis tool for
                professional-grade alopecia tracking.
              </p>
              <div className="flex gap-[10px]">
                <a href="https://apps.apple.com/us/app/hairloss-ai-scan-hair-health/id6563141135">
                  <Image
                    src="/images/redesign/appstore.png"
                    alt="Download on the App Store"
                    width={120}
                    height={40}
                  />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sampil.baldai">
                  <Image
                    src="/images/redesign/googleplay.png"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="flex flex-col gap-[50px] md:gap-[55px]">
          <div className="flex flex-col gap-[25px] md:max-w-[760px]">
            <CategoryTag label="Technology" />
            <SectionTitle>Your Phone is Now a Professional Lab</SectionTitle>
            <SectionDescription>
              Our neural network is trained on thousands of real-life examples and takes care of the
              hardest part - objective evaluation. No more guessing while looking in the mirror.
            </SectionDescription>
          </div>
          <div className="flex flex-col gap-[25px]">
            <div className="overflow-hidden h-[calc((100vw-30px)*600/343)] md:h-[620px] lg:h-[650px] md:mx-[calc(50%-50vw)]">
              <div
                ref={techCarousel.scrollRef}
                onWheel={handleHorizontalCarouselWheel}
                className="overflow-x-auto snap-x snap-mandatory flex gap-[10px] -mx-[15px] px-[15px] md:mx-0 md:px-[10px] scrollbar-hide h-full items-start"
              >
                {techCards.map((card) => (
                  <FeatureCard
                    key={card.title}
                    title={card.title}
                    description={card.description}
                    imageSrc={card.imageSrc}
                    imageAlt={card.title}
                  />
                ))}
              </div>
            </div>
            <ProgressDots
              count={techCards.length}
              active={techCarousel.activeIndex}
              onDotClick={techCarousel.scrollTo}
            />
          </div>
        </section>

        {/* Progress Tracking */}
        <section id="progress" className="flex flex-col gap-[50px] md:gap-[55px]">
          <div className="flex flex-col gap-[25px] md:max-w-[760px]">
            <CategoryTag label="Progress Tracking" />
            <SectionTitle>Progress You Can Actually Measure</SectionTitle>
            <SectionDescription>
              Hair recovery is a marathon. We help you stay motivated by highlighting even the
              smallest improvements.
            </SectionDescription>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
            <TrackingCard
              title="Hair Health Score (0–100)"
              description="Your personal hair health indexed, calculated based on hairline position, density and coverage."
              imageSrc="/images/redesign/stage_container.png"
              imageAlt="Hair Health Score"
              className="aspect-[345/401] md:aspect-[368/501]"
            />
            <TrackingCard
              title="Compare Scans"
              description="Easily notice even the smallest changes. Compare any two scans to see your progress over time."
              imageSrc="/images/redesign/compare.jpg"
              imageSrcMd="/images/redesign/compare_md.jpg"
              imageSrcMdWidth={1104}
              imageSrcMdHeight={1050}
              imageAlt="Compare Scans"
              className="aspect-[345/501] md:aspect-[368/501]"
            />
            <div className="md:col-span-2">
              <TrackingCard
                title="Progress Tracker"
                description="Track your journey from the first supplement to your first post-transplant haircut. See what made the difference. Easily spot patterns related to your treatment efficacy."
                imageSrc="/images/redesign/progress_tracker_m.png"
                imageSrcMd="/images/redesign/progress_tracker_vector_md.svg"
                imageSrcMdWidth={760}
                imageSrcMdHeight={250}
                imageAlt="Progress Tracker"
                className="aspect-[345/476] md:aspect-auto"
                imageClassName="md:mt-[24px]"
              />
            </div>
          </div>
        </section>

        {/* Calendar & Treatment */}
        <section id="calendar" className="flex flex-col items-center gap-[50px]">
          <div className="w-full md:max-w-[980px] flex flex-col gap-[50px] md:gap-[55px]">
            <CategoryTag label="Calendar & Treatment" />
            <div className="flex flex-col gap-[25px] md:gap-[40px]">
              <div className="flex flex-col gap-[20px] md:max-w-[760px]">
                <SectionTitle>A Routine That Never Fails</SectionTitle>
                <p
                  className="text-[18px] font-normal leading-[1.4] tracking-[0.18px]"
                  style={{ color: purpleSoft }}
                >
                  <span className="font-semibold" style={{ color: purple }}>
                    90% of treatment
                  </span>{" "}
                  success comes from consistency. We&apos;ve built a smart organizer specifically
                  for hair health management
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[25px] md:gap-y-[36px] gap-x-[25px] md:gap-x-[56px]">
                {routineItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-[20px] md:gap-[16px]">
                    <div className="w-[35px] h-[35px] flex-shrink-0 relative">
                      <Image src={item.icon} alt="" fill className="object-contain" sizes="35px" />
                    </div>
                    <div className="flex flex-col gap-[5px]">
                      <h3
                        className="text-[18px] font-medium tracking-[0.18px]"
                        style={{ color: purple }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-[18px] font-normal leading-[1.4] tracking-[0.18px]"
                        style={{ color: purpleSoft }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:max-w-[960px] aspect-[343/400] md:aspect-[960/540] overflow-hidden relative">
            <Image
              src="/images/redesign/routine.jpg"
              alt="Treatment calendar"
              fill
              className="object-cover md:hidden"
              sizes="calc(100vw - 30px)"
            />
            <div
              className="hidden md:flex absolute inset-[22px] lg:inset-[26px] items-center justify-center"
              style={{ background: purpleSubtle }}
            >
              <Image
                src="/images/redesign/routine_md.jpg"
                alt="Treatment calendar"
                width={842}
                height={914}
                className="h-[80%] w-auto object-contain"
                sizes="(min-width: 1024px) 760px, 86vw"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="flex flex-col items-center gap-[50px] md:gap-[55px]">
          <div className="w-full flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[25px] md:max-w-[760px]">
              <CategoryTag label="Testimonials" />
              <SectionTitle>Trusted by 50,000+ men From over 20 countries</SectionTitle>
              <SectionDescription>
                Verified users share measurable changes based on consistent scans and objective hair
                health scores
              </SectionDescription>
            </div>
            <div className="flex flex-col gap-[25px]">
              <div
                ref={reviewsCarousel.scrollRef}
                onWheel={handleHorizontalCarouselWheel}
                onMouseEnter={() => setIsReviewsAutoplayPaused(true)}
                onMouseLeave={() => setIsReviewsAutoplayPaused(false)}
                onTouchStart={() => setIsReviewsAutoplayPaused(true)}
                onTouchEnd={() => setIsReviewsAutoplayPaused(false)}
                className="overflow-x-auto snap-x snap-mandatory flex gap-[16px] -mx-[15px] px-[15px] md:mx-0 md:px-[16px] scrollbar-hide"
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[283px] md:w-[320px] h-[350px] flex flex-col justify-between p-[25px] snap-center"
                    style={{ background: purpleSubtle }}
                  >
                    <p
                      className="text-[14px] font-normal leading-[1.6] tracking-[0.14px]"
                      style={{ color: purpleSoft }}
                    >
                      {t.text}
                    </p>
                    <div className="flex flex-col gap-[15px]">
                      <div className="flex gap-0 text-[18px]" style={{ color: purple }}>
                        {"★★★★★"}
                      </div>
                      <div className="flex flex-col gap-[5px]">
                        <span
                          className="text-[16px] font-medium tracking-[0.16px]"
                          style={{ color: purple }}
                        >
                          {t.name}
                        </span>
                        <span
                          className="text-[14px] font-normal tracking-[0.14px]"
                          style={{ color: purpleSoft }}
                        >
                          {t.location} · {t.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ProgressDots
                count={testimonials.length}
                active={reviewsCarousel.activeIndex}
                onDotClick={reviewsCarousel.scrollTo}
              />
            </div>
          </div>
          <PrimaryButton>View all reviews</PrimaryButton>

          {/* Brands We Love */}
          <div className="w-full flex flex-col gap-[25px]">
            <h3
              className="text-[24px] font-semibold leading-none tracking-[-0.48px]"
              style={{ color: purple }}
            >
              Brands We Love
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-[16px]">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="h-[160px] flex flex-col items-center justify-end gap-[10px] py-[25px] px-[20px]"
                  style={{ background: purpleSubtle }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <Image
                      src={`/images/redesign/brands/${brand.img}`}
                      alt={brand.name}
                      width={140}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-[16px] font-normal leading-none tracking-[0.16px]"
                    style={{ color: purpleMuted }}
                  >
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="flex flex-col items-center gap-[50px] md:gap-[55px]">
          <div className="w-full flex flex-col gap-[50px] md:max-w-[980px]">
            <CategoryTag label="Frequently Asked Questions" />
            <div className="flex flex-col gap-[20px]">
              <SectionTitle>Frequently Asked Questions</SectionTitle>
              <SectionDescription>
                Clear answers about scanning, analysis, progress tracking, and data usage
              </SectionDescription>
            </div>
          </div>
          <div className="w-full md:max-w-[980px] flex flex-col gap-[5px]">
            {faqItems.slice(0, showAllFaq ? faqItems.length : FAQ_VISIBLE_COUNT).map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i}>
                  <button
                    type="button"
                    className="w-full flex items-start justify-between p-[15px] md:p-[20px] text-left transition-colors duration-300"
                    style={{ background: isOpen ? purple : purpleSubtle }}
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  >
                    <span
                      className="text-[16px] font-medium tracking-[0.16px] transition-colors duration-300"
                      style={{ color: isOpen ? "#fff" : purple }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="text-[16px] ml-[10px] flex-shrink-0 transition-colors duration-300"
                      style={{ color: isOpen ? "rgba(255,255,255,0.25)" : "rgba(56,28,89,0.25)" }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? 300 : 0,
                      opacity: isOpen ? 1 : 0,
                      background: purple,
                    }}
                  >
                    <p
                      className="px-[15px] md:px-[20px] pb-[15px] md:pb-[20px] text-[16px] font-normal leading-[1.6] tracking-[0.16px]"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              )
            })}
            {!showAllFaq && faqItems.length > FAQ_VISIBLE_COUNT && (
              <div
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: showAllFaq ? 5000 : 0 }}
              />
            )}
            {!showAllFaq && faqItems.length > FAQ_VISIBLE_COUNT && (
              <button
                type="button"
                className="w-full flex items-center justify-center p-[15px] text-[16px] font-medium tracking-[0.16px]"
                style={{ color: purpleAccent }}
                onClick={() => setShowAllFaq(true)}
              >
                Show more...
              </button>
            )}
          </div>
          <div className="w-full md:max-w-[980px] flex flex-col md:flex-row md:items-center md:justify-between gap-[25px]">
            <div className="flex flex-col">
              <span className="text-[16px] font-medium tracking-[0.16px]" style={{ color: purple }}>
                Still have questions?
              </span>
              <p
                className="text-[14px] font-normal leading-[1.5] tracking-[0.14px]"
                style={{ color: purpleMuted }}
              >
                Please connect with our support team, we&apos;re happy to help!
              </p>
            </div>
            <a
              href="mailto:hello@hairlossai.app"
              className="flex items-center justify-center gap-[10px] px-[25px] py-[16px] rounded-[12px] border text-[16px] font-medium tracking-[0.16px] whitespace-nowrap w-[70vw] md:w-auto self-start"
              style={{ borderColor: purpleBorder, color: purple }}
            >
              Contact us
              <Image src="/images/redesign/arrow_icon.png" alt="" width={16} height={19} />
            </a>
          </div>
        </section>
      </main>

      {/* Start Your Journey CTA */}
      <section className="mt-[50px] md:mt-[70px] px-[15px] md:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-[340px_1fr] gap-[16px] md:gap-0">
          <div
            className="order-1 md:order-2 aspect-[275/361] md:aspect-auto px-[35px] pt-[35px] pb-[30px] md:pt-[50px] md:pb-[50px] md:px-[25px] flex flex-col gap-[50px]"
            style={{ background: purple }}
          >
            <div className="flex items-center gap-[5px]">
              <div className="w-[12px] h-[12px] rounded-full" style={{ background: "#ceb1ff" }} />
              <span
                className="text-[16px] font-medium tracking-[0.16px]"
                style={{ color: "#ceb1ff" }}
              >
                Download app
              </span>
            </div>
            <div className="flex flex-col gap-[20px] text-white">
              <h2 className="text-[32px] font-semibold leading-none tracking-[-0.64px]">
                Start Your Journey
                <br />
                To Fuller Hair Today
              </h2>
              <p className="text-[18px] font-normal leading-[1.4] tracking-[0.18px] md:max-w-[640px]">
                Unlimited scans and analysis with subscription. Receive a precise analysis and a
                personalized treatment plan in under 60 seconds,
              </p>
            </div>
            <div className="flex gap-[10px]">
              <a href="https://apps.apple.com/us/app/hairloss-ai-scan-hair-health/id6563141135">
                <Image
                  src="/images/redesign/appstore_light.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.sampil.baldai">
                <Image
                  src="/images/redesign/googleplay_light.png"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                />
              </a>
            </div>
          </div>
          <div
            className="order-2 md:order-1 aspect-[345/400] md:aspect-auto md:min-h-[420px] relative overflow-x-clip overflow-y-visible md:overflow-visible md:[clip-path:inset(-1000px_-1000px_0_0)]"
            style={{ background: purpleSubtle }}
          >
            <div className="absolute bottom-0 left-[-15%] right-[-15%] md:bottom-[-8%] md:left-[-32%] md:right-[-26%] overflow-visible flex items-end">
              <Image
                src="/images/redesign/hand_holding.png"
                alt="App on phone"
                width={562}
                height={571}
                className="w-[130%] md:w-[90%] h-auto"
                sizes="(min-width: 768px) 42vw, calc((100vw - 30px) * 1.3)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-[15px] md:px-6 lg:px-8 max-w-[1240px] mx-auto flex flex-col gap-[50px] mt-[150px] pb-[40px]">
        <div
          className="flex flex-col gap-[50px] pt-[25px]"
          style={{ borderTop: `1px solid ${purpleBorder}` }}
        >
          <div className="flex items-start justify-between md:gap-[25px]">
            <h3
              className="text-[32px] font-semibold leading-none tracking-[-0.64px] w-[242px]"
              style={{ color: purple }}
            >
              Stay in the loop with Hair health tips
            </h3>
            <button
              type="button"
              className="flex items-center gap-[5px] text-[16px] font-semibold tracking-[-0.32px]"
              style={{ color: purple }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back To Top <span style={{ color: "rgba(56,28,89,0.25)" }}>↑</span>
            </button>
          </div>
          <div className="md:self-start">
            <PrimaryButton
              outline
              icon={<Image src="/images/redesign/arrow_icon.png" alt="" width={16} height={19} />}
            >
              Subscribe to our newsletter
            </PrimaryButton>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-[25px] text-[16px] font-normal tracking-[0.16px]"
          style={{ color: purple }}
        >
          <div className="leading-normal">
            <p>London (R&amp;D Center)</p>
            <p>T: (+44) 20 7946 0101</p>
            <p>24 Baker Street, Marylebone</p>
            <p>NW1 6XE London, United Kingdom</p>
          </div>
          <div className="leading-normal">
            <p>San Francisco (HQ)</p>
            <p>T: (+1) 415 555 0198</p>
            <p>500 Howard St, South of Market CA</p>
            <p>94105 San Francisco, USA</p>
          </div>
          <div
            className="flex gap-[25px] text-[16px] font-normal tracking-[0.16px]"
            style={{ color: purple }}
          >
            <div className="flex-1 flex flex-col gap-[5px]">
              <Link href="#">Atlas DNA Kit</Link>
              <Link href="#">Technology</Link>
              <Link href="#">Tracker</Link>
              <Link href="#">Treatments</Link>
            </div>
            <div className="flex-1 flex flex-col gap-[5px]">
              <Link href="#">Testimonials</Link>
              <Link href="#">FAQ</Link>
              <Link href="#">Blog</Link>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col gap-[25px] text-[14px] font-normal tracking-[0.14px] pt-[25px]"
          style={{ color: purple, borderTop: `1px solid ${purpleBorder}` }}
        >
          <p>All rights reserved - Copyright © 2026</p>
        </div>
      </footer>
    </div>
  )
}
