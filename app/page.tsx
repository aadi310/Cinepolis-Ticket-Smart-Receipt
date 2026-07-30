"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import {
  Download,
  ExternalLink,
  FileText,
  History,
  Instagram,
  Mail,
  Facebook,
  Star,
  Ticket,
  Film,
  Armchair,
  Smartphone,
  LifeBuoy,
  ScanLine,
} from "lucide-react"

// Indian Rupee formatter
const fmt = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const APP_LINK = "https://onelink.to/bcvnnr"

// Circular scalloped "PAID" stamp — brand purple
function PaidStamp() {
  return (
    <svg viewBox="0 0 100 100" width="46" height="46" className="shrink-0" style={{ transform: "rotate(-8deg)" }}>
      <defs>
        <path id="ticketStampTopArc" d="M 12,50 A 38,38 0 1,1 88,50" fill="none" />
        <path id="ticketStampBottomArc" d="M 12,52 A 38,38 0 1,0 88,52" fill="none" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke="#3D1B78" strokeWidth="2.5" strokeDasharray="3.2 3.2" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="#3D1B78" strokeWidth="1.3" />
      <text fontSize="6.5" fontWeight="800" fill="#3D1B78" letterSpacing="1">
        <textPath href="#ticketStampTopArc" startOffset="50%" textAnchor="middle">
          THANK YOU
        </textPath>
      </text>
      <text x="50" y="56" fontSize="17" fontWeight="900" fill="#3D1B78" textAnchor="middle" fontFamily="Poppins, sans-serif" letterSpacing="1">
        PAID
      </text>
      <text fontSize="6.5" fontWeight="800" fill="#3D1B78" letterSpacing="1">
        <textPath href="#ticketStampBottomArc" startOffset="50%" textAnchor="middle">
          CINÉPOLIS
        </textPath>
      </text>
    </svg>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentPosterSlide, setCurrentPosterSlide] = useState(0)
  const [showTerms, setShowTerms] = useState(false)
  const [showBookingHistory, setShowBookingHistory] = useState(false)
  const receiptContainerRef = useRef<HTMLDivElement>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [currentBookingId, setCurrentBookingId] = useState("current")

  const [promoApi, setPromoApi] = useState<CarouselApi>()
  const [posterApi, setPosterApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!promoApi) return
    const interval = setInterval(() => {
      promoApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [promoApi])

  useEffect(() => {
    if (!promoApi) return
    promoApi.on("select", () => {
      setCurrentSlide(promoApi.selectedScrollSnap())
    })
  }, [promoApi])

  useEffect(() => {
    if (!posterApi) return
    const interval = setInterval(() => {
      posterApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [posterApi])

  useEffect(() => {
    if (!posterApi) return
    posterApi.on("select", () => {
      setCurrentPosterSlide(posterApi.selectedScrollSnap())
    })
  }, [posterApi])

  // Auto-height for WordPress iframe
  useEffect(() => {
    const postHeight = () => {
      const marker = document.getElementById("height-marker")
      if (marker && window.parent) {
        const rect = marker.getBoundingClientRect()
        const newHeight = Math.ceil(rect.top + rect.height + window.scrollY)
        window.parent.postMessage({ frameHeight: newHeight }, "*")
      }
    }
    postHeight()
    const ro = new ResizeObserver(postHeight)
    ro.observe(document.body)
    window.addEventListener("resize", postHeight)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", postHeight)
    }
  }, [])

  const bookings = {
    current: {
      bookingId: "7937 000000005834321",
      invoiceNo: "00099929",
      cinema: "Cinépolis Saket, New Delhi",
      movie: "Main Vaapas Aaunga",
      certification: "U/A 16+",
      date: "16-06-2026",
      time: "08:00 PM",
      screen: "03",
      seats: "PREMIUM J 5-6",
      ticketCount: 2,
      ticketPrice: 300.0,
      netTicketPrice: 254.24,
      cgst: 22.88,
      sgst: 22.88,
      total: 300.0,
      gstin: "07AADCC2076J1ZO",
      hsn: "9996",
      cin: "U92100HR2007PTC039680",
    },
    hist1: {
      bookingId: "7937 000000005611209",
      invoiceNo: "00098410",
      cinema: "Cinépolis Ireo, Gurugram",
      movie: "The Great Punjab Robbery",
      certification: "U/A 16+",
      date: "07-08-2026",
      time: "09:15 PM",
      screen: "05",
      seats: "RECLINER K 3-4",
      ticketCount: 2,
      ticketPrice: 450.0,
      netTicketPrice: 381.36,
      cgst: 34.32,
      sgst: 34.32,
      total: 450.0,
      gstin: "07AADCC2076J1ZO",
      hsn: "9996",
      cin: "U92100HR2007PTC039680",
    },
    hist2: {
      bookingId: "7937 000000005298871",
      invoiceNo: "00096732",
      cinema: "Cinépolis Saket, New Delhi",
      movie: "Superhit Crunch Premiere",
      certification: "U/A",
      date: "02-05-2026",
      time: "06:30 PM",
      screen: "01",
      seats: "CLASSIC F 8-9",
      ticketCount: 2,
      ticketPrice: 280.0,
      netTicketPrice: 237.29,
      cgst: 21.36,
      sgst: 21.35,
      total: 280.0,
      gstin: "07AADCC2076J1ZO",
      hsn: "9996",
      cin: "U92100HR2007PTC039680",
    },
  }

  const currentBooking = bookings[currentBookingId]

  const bookingHistory = [
    { id: "current", date: bookings.current.date, movie: bookings.current.movie, amount: bookings.current.total },
    { id: "hist1", date: bookings.hist1.date, movie: bookings.hist1.movie, amount: bookings.hist1.total },
    { id: "hist2", date: bookings.hist2.date, movie: bookings.hist2.movie, amount: bookings.hist2.total },
  ]

  const handleFeedbackSubmit = () => {
    if (!rating) {
      alert("Please select a rating before submitting.")
      return
    }
    setFeedbackSubmitted(true)
    setTimeout(() => setFeedbackSubmitted(false), 5000)
  }

  const handleEmailReceipt = () => {
    window.open(`mailto:?subject=Your Cinépolis Ticket&body=Booking ID: ${currentBooking.bookingId}`)
  }

  const handleDownloadReceipt = () => {
    const receiptContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Cinépolis Tax Invoice</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Poppins',sans-serif;font-size:14px;color:#111;background:#fff;width:800px;margin:0 auto;padding:24px;}
.receipt-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;padding-bottom:16px;border-bottom:3px solid #7742D8;}
.company-info h1{font-size:30px;color:#3D1B78;font-weight:700;margin-bottom:4px;}
.company-info p{font-size:12px;color:#555;line-height:1.4;}
.bill-info{text-align:right;font-size:12px;}
.bill-info div{margin-bottom:4px;}
.bill-id{font-weight:600;color:#3D1B78;}
.movie-section{background:#F4EEFD;padding:14px;border-left:4px solid #7742D8;border-radius:0 8px 8px 0;margin-bottom:22px;}
.movie-section h3{font-size:16px;color:#3D1B78;font-weight:700;margin-bottom:2px;}
.movie-section p{font-size:12px;color:#666;}
.items-table{width:100%;border-collapse:collapse;margin-bottom:24px;}
.items-table th{background:#3D1B78;color:#F9B233;padding:10px 8px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;}
.items-table th:last-child, .items-table td:last-child{text-align:right;}
.items-table th:nth-child(2), .items-table td:nth-child(2){text-align:center;}
.items-table td{padding:12px 8px;border-bottom:1px solid #eee;font-size:12px;vertical-align:top;}
.totals-row td{color:#666;font-size:12px;border-bottom:none;padding:6px 8px;}
.net-total-row td{font-weight:700;color:#3D1B78;font-size:18px;border-top:2px solid #F9B233;padding:12px 8px 4px;}
.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px dashed #ccc;font-size:12px;color:#555;}
.footer strong{color:#3D1B78;}
@media print{body{-webkit-print-color-adjust:exact;width:100%;padding:0;}}
</style>
</head>
<body>
<div class="receipt-header">
  <div class="company-info">
    <h1>cinépolis</h1>
    <p><strong>${currentBooking.cinema}</strong><br>Tax Invoice</p>
  </div>
  <div class="bill-info">
    <div><strong>Booking ID:</strong> <span class="bill-id">${currentBooking.bookingId}</span></div>
    <div><strong>Invoice No.:</strong> ${currentBooking.invoiceNo}</div>
    <div><strong>Date & Time:</strong> ${currentBooking.date} | ${currentBooking.time}</div>
  </div>
</div>
<div class="movie-section">
  <h3>${currentBooking.movie} (${currentBooking.certification})</h3>
  <p>Screen ${currentBooking.screen} • Seats ${currentBooking.seats} • ${currentBooking.ticketCount} Tickets</p>
</div>
<table class="items-table">
  <thead><tr><th>Description</th><th>Qty</th><th>Amount</th></tr></thead>
  <tbody>
    <tr><td>Ticket Price</td><td>${currentBooking.ticketCount}</td><td>${fmt(currentBooking.ticketPrice)}</td></tr>
    <tr class="totals-row"><td colspan="2">Net Ticket Price</td><td>${fmt(currentBooking.netTicketPrice)}</td></tr>
    <tr class="totals-row"><td colspan="2">CGST (9%)</td><td>${fmt(currentBooking.cgst)}</td></tr>
    <tr class="totals-row"><td colspan="2">SGST (9%)</td><td>${fmt(currentBooking.sgst)}</td></tr>
    <tr class="net-total-row"><td colspan="2">Total Amount Paid</td><td>${fmt(currentBooking.total)}</td></tr>
  </tbody>
</table>
<div class="footer">
  <p><strong>Enjoy the show! See you again at Cinépolis.</strong></p>
  <p>GSTIN: ${currentBooking.gstin} | CIN: ${currentBooking.cin}</p>
  <p style="margin-top:8px;">Powered by SmartBill</p>
</div>
</body>
</html>
  `
    const blob = new Blob([receiptContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Cinepolis_Ticket_${currentBooking.invoiceNo}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDownloadApp = () => window.open(APP_LINK, "_blank")
  const handleNeedHelp = () => window.open("https://wa.me/+919620921294", "_blank")
  const handleSocialLink = (url: string) => window.open(url, "_blank")

  return (
    // overflow-x-hidden strictly prevents horizontal scroll jitter
    <div className="min-h-screen bg-[#E8EAEF] flex justify-center py-4 overflow-x-hidden">
      <div
        id="receipt-root"
        ref={receiptContainerRef}
        className="w-full max-w-md mx-auto bg-[#E8EAEF] relative font-poppins overflow-x-hidden"
      >
        <div className="flex flex-col w-full gap-3 pb-4 px-3">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#3D1B78] via-[#5B2A9E] to-[#7742D8] px-5 pt-6 pb-8 mx-3 rounded-2xl text-center text-white shadow-sm">
            <img
              src="/images/design-mode/cinepolis.png"
              alt="Cinépolis"
              className="h-9 w-auto mx-auto mb-2"
            />
            <div className="text-xs font-semibold tracking-[0.15em] uppercase opacity-90">{currentBooking.cinema}</div>
          </div>

          {/* Movie Poster Carousel */}
          <div className="mx-3 -mt-2 relative rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <Carousel className="w-full" setApi={setPosterApi} opts={{ loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <div className="relative w-full aspect-[2/3] bg-gray-100">
                    <Image src="/images/design-mode/poster-1.png" alt={`${currentBooking.movie} poster`} fill className="object-cover" priority />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative w-full aspect-[2/3] bg-gray-100">
                    <Image src="/images/design-mode/poster-2.png" alt={`${currentBooking.movie} poster`} fill className="object-cover" />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                {[0, 1].map((index) => (
                  <button key={index} onClick={() => posterApi?.scrollTo(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentPosterSlide === index ? "w-5 bg-[#F9B233]" : "w-1.5 bg-white/70"}`} />
                ))}
              </div>
            </Carousel>
          </div>

          {/* Vertical Movie Ticket Card */}
          <div className="mx-3 relative filter drop-shadow-md">
            <div className="bg-white rounded-2xl border border-gray-200 relative overflow-hidden">
              
              {/* Top Section / QR Code */}
              <div className="pt-6 pb-5 px-5 text-center relative">
                <span className="inline-block bg-[#F9B233] text-black text-[10px] font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-4">
                  <ScanLine className="inline h-3 w-3 mr-1 -mt-0.5" />
                  Scan to Enter
                </span>

                <div className="flex justify-center">
                  <div className="p-3 border-2 border-[#F9B233] rounded-2xl bg-white">
                    <Image
                      src="/images/design-mode/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
                      alt="QR Code"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>

                <div className="mt-4 bg-[#F4EEFD] border border-[#DCC7F5] rounded-xl px-3 py-2.5 text-[11px] text-[#3D1B78] font-medium">
                  Show this QR code at the entrance of the cinema to enter the show.
                </div>

                <div className="mt-4 flex justify-center gap-8 text-left">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">Booking ID</div>
                    <div className="text-xs font-semibold text-gray-900">{currentBooking.bookingId}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">Invoice No.</div>
                    <div className="text-xs font-semibold text-gray-900">{currentBooking.invoiceNo}</div>
                  </div>
                </div>
              </div>

              {/* Perforation Line 1 with Direct Punch-Holes (Contained) */}
              <div className="relative flex items-center justify-between my-1 w-full overflow-hidden">
                <div className="w-5 h-5 bg-[#E8EAEF] rounded-full -translate-x-1/2 border-r border-gray-300/60 shrink-0 z-10" />
                <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-1" />
                <div className="w-5 h-5 bg-[#E8EAEF] rounded-full translate-x-1/2 border-l border-gray-300/60 shrink-0 z-10" />
              </div>

              {/* Middle Section / Movie Details */}
              <div className="px-5 pt-4 pb-5 relative">
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7742D8] mb-1">Your Booking</div>
                <div className="text-lg font-bold text-gray-900 leading-snug">{currentBooking.movie}</div>
                <div className="text-xs text-gray-500 mt-0.5 mb-4">{currentBooking.certification} • {currentBooking.date} | {currentBooking.time}</div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200">
                    <Film className="h-4 w-4 text-[#7742D8] mx-auto mb-1" />
                    <div className="text-[10px] text-gray-500">Screen</div>
                    <div className="text-sm font-semibold text-gray-900">{currentBooking.screen}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200">
                    <Armchair className="h-4 w-4 text-[#7742D8] mx-auto mb-1" />
                    <div className="text-[10px] text-gray-500">Seats</div>
                    <div className="text-sm font-semibold text-gray-900">{currentBooking.seats}</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200">
                    <Ticket className="h-4 w-4 text-[#7742D8] mx-auto mb-1" />
                    <div className="text-[10px] text-gray-500">Tickets</div>
                    <div className="text-sm font-semibold text-gray-900">{currentBooking.ticketCount}</div>
                  </div>
                </div>
              </div>

              {/* Perforation Line 2 with Direct Punch-Holes (Contained) */}
              <div className="relative flex items-center justify-between my-1 w-full overflow-hidden">
                <div className="w-5 h-5 bg-[#E8EAEF] rounded-full -translate-x-1/2 border-r border-gray-300/60 shrink-0 z-10" />
                <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-1" />
                <div className="w-5 h-5 bg-[#E8EAEF] rounded-full translate-x-1/2 border-l border-gray-300/60 shrink-0 z-10" />
              </div>

              {/* Bottom Section / Amount Breakup */}
              <div className="px-5 pt-4 pb-6 relative">
                <div className="text-[11px] font-bold text-[#7742D8] uppercase tracking-wide mb-3">Amount Breakup</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#6B5A94]">Ticket Price</span><span className="text-[#3D1B78] font-medium">{fmt(currentBooking.ticketPrice)}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B5A94]">Net Ticket Price</span><span className="text-[#3D1B78] font-medium">{fmt(currentBooking.netTicketPrice)}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B5A94]">CGST (9%)</span><span className="text-[#3D1B78] font-medium">{fmt(currentBooking.cgst)}</span></div>
                  <div className="flex justify-between pb-2 border-b border-[#E4D6F8]"><span className="text-[#6B5A94]">SGST (9%)</span><span className="text-[#3D1B78] font-medium">{fmt(currentBooking.sgst)}</span></div>
                </div>

                {/* Total Amount Paid */}
                <div className="flex items-center justify-between pt-3">
                  <span className="text-base font-bold text-gray-900">Total Amount Paid</span>
                  <div className="flex items-center gap-2">
                    <PaidStamp />
                    <span className="text-lg font-bold text-[#3D1B78]">{fmt(currentBooking.total)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Rate Experience */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 p-4">
            {feedbackSubmitted ? (
              <div className="text-center py-6 bg-green-50 rounded-xl border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Thanks for your feedback!</div>
                <div className="text-xs text-gray-500">Your input helps us improve every Cinépolis show.</div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900 text-center">Rate Your Experience</h3>

                <div className="flex justify-center gap-3 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setRating(star)
                        setSelectedTags([])
                      }}
                      className="transition-transform active:scale-90"
                    >
                      <Star className={`h-8 w-8 transition-colors ${star <= rating ? "fill-[#F9B233] text-[#F9B233]" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>

                {rating > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide text-center">Tell us more</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(rating >= 4
                        ? ["Great picture quality", "Comfortable seating", "Clean auditorium", "Smooth entry"]
                        : ["Screen/sound issue", "Seating issue", "Long queue", "Staff behaviour"]
                      ).map((item) => (
                        <button key={item}
                          onClick={() => setSelectedTags((prev) => prev.includes(item) ? prev.filter((tag) => tag !== item) : [...prev, item])}
                          className={`text-[11px] px-3 py-1.5 rounded-full border transition ${selectedTags.includes(item) ? "bg-[#3D1B78] text-white border-[#3D1B78]" : "border-gray-200 bg-gray-50"}`}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <textarea rows={2} placeholder="Additional feedback (optional)"
                  className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#7742D8] focus:border-[#7742D8] outline-none resize-none"
                  value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />

                <button className="w-full bg-[#F9B233] hover:bg-[#e8a422] text-black h-10 text-xs font-semibold rounded-xl transition active:scale-[0.98]"
                  onClick={handleFeedbackSubmit} disabled={!rating}>
                  Submit Feedback
                </button>
              </div>
            )}
          </div>

          {/* Promo Banner */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden mx-3 relative">
            <a href="https://www.instagram.com/cinepolisindia/?hl=en" target="_blank" rel="noopener noreferrer" className="block relative w-full aspect-[1600/485] bg-[#F4EEFD]">
              <Image src="/images/design-mode/cinepolis-ticket-banner-2.png" alt="Cinépolis Promotion" fill className="object-cover" />
            </a>
          </div>

          {/* Download App CTA */}
          <div className="bg-gradient-to-br from-[#3D1B78] via-[#5B2A9E] to-[#7742D8] rounded-2xl shadow-md mx-3 p-5 text-white">
            <div className="flex items-center">
              <div className="bg-white/15 p-3 rounded-xl mr-4">
                <Smartphone className="h-6 w-6 text-[#F9B233]" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Get the Cinépolis App</div>
                <div className="text-[11px] opacity-80">Book faster, pre-order snacks & manage bookings on the go</div>
              </div>
            </div>
            <button onClick={handleDownloadApp}
              className="w-full mt-4 bg-[#F9B233] hover:bg-[#e8a422] text-black h-10 text-xs font-bold rounded-xl transition active:scale-[0.98] flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Download App
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 p-4">
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setShowBookingHistory(true)}
                className="flex flex-col items-center justify-center bg-[#F4EEFD] border border-[#DCC7F5] rounded-xl py-3 active:scale-[0.98]">
                <History className="h-5 w-5 text-[#3D1B78] mb-1" />
                <span className="text-[11px] font-medium text-gray-700">Bookings</span>
              </button>
              <button onClick={handleEmailReceipt}
                className="flex flex-col items-center justify-center bg-[#F4EEFD] border border-[#DCC7F5] rounded-xl py-3 active:scale-[0.98]">
                <Mail className="h-5 w-5 text-[#3D1B78] mb-1" />
                <span className="text-[11px] font-medium text-gray-700">Email</span>
              </button>
              <button onClick={handleDownloadReceipt}
                className="flex flex-col items-center justify-center bg-[#F4EEFD] border border-[#DCC7F5] rounded-xl py-3 active:scale-[0.98]">
                <FileText className="h-5 w-5 text-[#3D1B78] mb-1" />
                <span className="text-[11px] font-medium text-gray-700">Invoice</span>
              </button>
            </div>
          </div>

          {/* Help row */}
          <div className="mx-3 grid grid-cols-2 gap-3">
            <button onClick={() => setShowTerms(!showTerms)}
              className="bg-white border border-gray-200 rounded-full py-2.5 text-xs font-semibold text-gray-700 shadow-sm active:scale-[0.98]">
              Terms & Conditions
            </button>
            <button onClick={handleNeedHelp}
              className="bg-white border border-gray-200 rounded-full py-2.5 text-xs font-semibold text-gray-700 shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5">
              <LifeBuoy className="h-3.5 w-3.5" />
              Need help?
            </button>
          </div>

          {showTerms && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md mx-3 p-4 text-[11px] text-gray-500 space-y-1 font-medium">
              <p>• Tickets once booked cannot be exchanged or refunded, subject to cinema policy.</p>
              <p>• Please carry a valid ID proof matching the age certification of the film.</p>
              <p>• Entry is permitted only against a valid QR code shown at the ticket counter.</p>
              <p>• For support visit www.cinepolisindia.com.</p>
            </div>
          )}

          {/* GST / CIN */}
          <div className="mx-3 text-center text-[10px] text-gray-400 leading-relaxed">
            CIN: {currentBooking.cin}<br />
            GSTIN: {currentBooking.gstin} / HSN: {currentBooking.hsn}
          </div>

          {/* Stay Connected */}
          <div className="flex justify-center gap-6 mx-3">
            <button onClick={() => handleSocialLink("https://www.instagram.com/cinepolisindia/?hl=en")} className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center mb-1">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Instagram</span>
            </button>
            <button onClick={() => handleSocialLink("https://www.facebook.com/CinepolisIndia")} className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center mb-1">
                <Facebook className="h-4 w-4 text-white" />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Facebook</span>
            </button>
            <button onClick={() => handleSocialLink("https://www.cinepolisindia.com")} className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-[#3D1B78] flex items-center justify-center mb-1">
                <ExternalLink className="h-4 w-4 text-[#F9B233]" />
              </div>
              <span className="text-[10px] font-medium text-gray-600">Website</span>
            </button>
          </div>

          {/* Powered By footer */}
          <div className="flex items-center justify-center gap-1.5 py-2">
            <span className="text-[10px] font-medium text-gray-400">Digital billing powered by</span>
            <span className="text-[10px] font-bold" style={{ color: "#0B5D42" }}>SmartBill</span>
            <span className="text-[10px] text-gray-300">×</span>
            <img
              src="/images/design-mode/Pine Labs Logo.png"
              alt="Pine Labs"
              className="h-3 w-auto"
            />
          </div>

          <div id="height-marker" style={{ height: "1px" }} />
        </div>

        {/* Booking History Modal */}
        {showBookingHistory && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowBookingHistory(false)} />
            <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 shadow-2xl border border-gray-200 overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-[#3D1B78] p-2 rounded-lg mr-3">
                    <History className="h-4 w-4 text-[#F9B233]" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">Booking History</h3>
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100" onClick={() => setShowBookingHistory(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-gray-500">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                {bookingHistory.map((booking) => (
                  <button
                    key={booking.id}
                    onClick={() => {
                      setCurrentBookingId(booking.id)
                      setShowBookingHistory(false)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="w-full flex items-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#7742D8] transition"
                  >
                    <div className="bg-white border border-gray-200 p-2 rounded-lg mr-3">
                      <FileText className="h-4 w-4 text-[#3D1B78]" />
                    </div>
                    <div className="flex-grow text-left">
                      <div className="text-sm font-semibold text-gray-900 line-clamp-1">{booking.movie}</div>
                      <div className="text-[11px] text-gray-500">{booking.date}</div>
                    </div>
                    <div className="text-sm font-semibold text-[#3D1B78]">{fmt(booking.amount)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
