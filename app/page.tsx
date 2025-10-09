import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Navigation */}
      <div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:top-4 sm:right-8 sm:bottom-auto sm:left-auto sm:transform-none z-50"
        style={{ opacity: 0.7 }}
      >
        <div className="flex gap-6">
          <Link href="/privacy" className="text-sm hover:text-muted-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm hover:text-muted-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>

      {/* Main Image */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ top: "3vh" }}>
        <Image
          src="/images/main_image_x3.webp"
          alt="Hairloss AI Preview"
          width={750}
          height={600}
          className="w-auto"
          style={{
            height: "auto",
            maxHeight: "65vh",
            maxWidth: "120vw",
          }}
          priority
        />
      </div>

      {/* Vensel Image */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ marginTop: "2vh" }}>
        <Image
          src="/images/vensel.png"
          alt="#1 AI Hair App"
          width={230}
          height={60}
          className="h-auto sm:mt-[2vh]"
        />
      </div>

      {/* Main Content Container */}
      <div className="absolute left-0 right-0 flex flex-col items-center top-[40vh] sm:top-[50vh]">
        {/* Logo */}
        <div className="mb-2">
          <Image
            src="/images/logo.svg"
            alt="Hairloss AI Logo"
            width={47}
            height={42}
            className="2xl:w-[64px] 2xl:h-58px]"
          />
        </div>

        {/* Title */}
        <h1
          className="text-center mb-2"
          style={{ fontFamily: "SFProDisplay", fontWeight: 500, fontSize: "40px" }}
        >
          <span className="2xl:text-[52px]">Hairloss AI</span>
        </h1>

        {/* Features List */}
        <div className="max-w-md mb-6">
          <ul
            className="space-y-1 text-left"
            style={{ fontFamily: "SFProDisplay", fontWeight: 400, fontSize: "16px" }}
          >
            <li className="flex items-center gap-3">
              <Image src="/images/checkmark.svg" width={12} height={13} alt="Checkmark" />
              <span>World’s Most Accurate AI Hair Scan</span>
            </li>
            <li className="flex items-center gap-3">
              <Image src="/images/checkmark.svg" width={12} height={13} alt="Checkmark" />
              <span>Over 1 Million Hairlines Scanned</span>
            </li>
            <li className="flex items-center gap-3">
              <Image src="/images/checkmark.svg" width={12} height={13} alt="Checkmark" />
              <span>Setup Custom Routines And Get Reminders</span>
            </li>
            <li className="flex items-center gap-3">
              <Image src="/images/checkmark.svg" width={12} height={13} alt="Checkmark" />
              <span>Unlimited Scans With Subscription</span>
            </li>
          </ul>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-row gap-1 w-full max-w-md justify-center items-center">
          <a
            href="https://apps.apple.com/us/app/hairloss-ai-scan-hair-health/id6563141135"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/images/app_store.svg"
              width={135}
              height={40}
              alt="Download on the App Store"
            />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.sampil.baldai"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/images/google_play.svg"
              width={135}
              height={40}
              alt="GET IT ON Google Play"
            />
          </a>
        </div>
      </div>

      {/* QR Code */}
      <div className="absolute bottom-8 right-8 z-10 text-center hidden sm:block">
        <div
          className="flex items-center justify-center rounded-[20px] mb-1"
          style={{
            backgroundColor: "#1C1824",
            width: "154px",
            height: "154px",
            boxShadow: "0 20px 20px rgba(255, 255, 255, 0.2)",
          }}
        >
          <Image src="/images/qrcode_prod.png" alt="QR Code" width={104} height={104} />
        </div>
        <p className="text-xs text-muted-foreground">Download Hairloss AI</p>
      </div>
    </div>
  )
}
