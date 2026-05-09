import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

/* ── Image imports ── */
import CollegeImg from "../assets/images/College.jpg";
import GroundImg from "../assets/images/Ground.jpg";
import EnquiryImg from "../assets/images/Enquiry.jpg";
import PlacementImg from "../assets/images/Placement.jpg";
import BajmcImg from "../assets/images/bajmc.jpg";
import LibraryImg from "../assets/images/Library.jpg";

/* ───────────────────────────────────────────────────────────
   🖼️  SLIDESHOW IMAGES — Add your own images here.
   Each entry needs: { src: <imported image>, alt: "caption" }
   ─────────────────────────────────────────────────────────── */
const slideshowImages = [
  { src: CollegeImg, alt: "College Campus" },
  { src: GroundImg, alt: "College Ground" },
  { src: EnquiryImg, alt: "Enquiry" },
  { src: PlacementImg, alt: "Placements" },
  { src: BajmcImg, alt: "BA(JMC) Programme" },
  { src: LibraryImg, alt: "Library" },
];

/* ── Quick‑links data ── */
const quickLinks = [
  { label: "About BVP", href: "#" },
  { label: "About BVICAM", href: "#" },
  { label: "Director", href: "#" },
  { label: "Admission", href: "/apply" },
  { label: "Fee Structure", href: "#" },
  { label: "Placement History", href: "#" },
  { label: "Course Materials", href: "#" },
  { label: "SIS Portal", href: "#" },
];

/* ── Important‑links data ── */
const importantLinks = [
  { label: "Admission Enquiry", href: "/apply" },
  {
    label: 'National Seminar on "Courtroom to Boardroom: Law, Media and Management"',
    href: "#",
  },
  { label: "Admission Enquiry", href: "/apply" },
  { label: "Bank of Baroda Achievers Award - 2026", href: "#" },
  {
    label: 'National Seminar on "Courtroom to Boardroom: Law, Media and Management"',
    href: "#",
  },
  { label: "Admission Enquiry", href: "/apply" },
];

/* ════════════════════════════════════════════════════════════
   Shared style constants
   ════════════════════════════════════════════════════════════ */
const PANEL_HEADER = {
  background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
  color: "#fff",
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "10px 0",
  letterSpacing: 0.5,
  borderRadius: "6px 6px 0 0",
};

const PANEL_BODY = {
  background: "#fff",
  border: "1px solid #bbdefb",
  borderTop: "none",
  borderRadius: "0 0 6px 6px",
  padding: 0,
};

const LINK_STYLE = {
  display: "block",
  padding: "10px 16px",
  color: "#1565c0",
  fontWeight: 600,
  fontSize: "0.88rem",
  textDecoration: "none",
  borderBottom: "1px dashed #90caf9",
  transition: "background .2s",
};

/* ════════════════════════════════════════════════════════════
   Component
   ════════════════════════════════════════════════════════════ */
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slideshowImages.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  /* Auto‑advance every 4 seconds */
  useEffect(() => {
    if (totalSlides <= 1) return;
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id);
  }, [nextSlide, totalSlides]);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* ─── Top Row: Quick Links | Slideshow | Important Links ─── */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* ── Quick Links (left sidebar) ── */}
        <div style={{ flex: "0 0 200px", minWidth: 180 }}>
          <div style={PANEL_HEADER}>Quick Links</div>
          <div style={PANEL_BODY}>
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                style={{
                  ...LINK_STYLE,
                  ...(i === quickLinks.length - 1
                    ? { borderBottom: "none" }
                    : {}),
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#e3f2fd")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Image Slideshow (center) ── */}
        <div style={{ flex: "1 1 0", minWidth: 300 }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#e0e0e0",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            {totalSlides === 0 ? (
              /* Placeholder when no images are added */
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#757575",
                  fontSize: "1.1rem",
                  gap: 8,
                }}
              >
                <i
                  className="bi bi-images"
                  style={{ fontSize: "3rem", color: "#90caf9" }}
                ></i>
                <span>Add images to the <b>slideshowImages</b> array</span>
              </div>
            ) : (
              <>
                {/* Current image */}
                <img
                  src={slideshowImages[currentSlide].src}
                  alt={slideshowImages[currentSlide].alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                    display: "block",
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Prev arrow */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 12,
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.45)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.45)")
                  }
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                {/* Next arrow */}
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 12,
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.45)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.7)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(0,0,0,0.45)")
                  }
                >
                  <i className="bi bi-chevron-right"></i>
                </button>

                {/* Dot indicators */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  {slideshowImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: "2px solid #fff",
                        background:
                          idx === currentSlide
                            ? "#fff"
                            : "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                        padding: 0,
                        transition: "background .2s",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Important Links (right sidebar) ── */}
        <div style={{ flex: "0 0 220px", minWidth: 200 }}>
          <div style={PANEL_HEADER}>Important Links</div>
          <div style={{ ...PANEL_BODY, maxHeight: 360, overflowY: "auto" }}>
            {importantLinks.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                style={{
                  ...LINK_STYLE,
                  fontSize: "0.82rem",
                  ...(i === importantLinks.length - 1
                    ? { borderBottom: "none" }
                    : {}),
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#e3f2fd")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Admission Procedure Section ─── */}
      <section
        style={{
          marginTop: 32,
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          borderRadius: 10,
          padding: "32px 36px",
          boxShadow: "0 2px 10px rgba(21,101,192,0.08)",
        }}
      >
        <h2
          style={{
            color: "#1565c0",
            fontWeight: 700,
            marginBottom: 16,
            fontSize: "1.5rem",
          }}
        >
          Admission Procedure
        </h2>

        <div
          style={{
            color: "#333",
            lineHeight: "1.7",
            fontSize: "1rem",
            marginBottom: "24px",
          }}
        >
          <p>
            The admission to the BA (JMC) and MCA Programmes of this Institute
            is governed by the rules and regulations of Guru Gobind Singh
            Indraprastha (GGSIP) University, New Delhi, and Govt. of NCT, Delhi.
            Detailed Procedure can also be referred at{" "}
            <a
              href="https://www.ipu.ac.in"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1565c0", fontWeight: 600 }}
            >
              www.ipu.ac.in
            </a>
            . For more details, Admission Committee may be contacted, on the
            below mentioned contact details.{" "}
            <Link to="/apply" style={{ color: "#1565c0", fontWeight: 600 }}>
              Click here for more details
            </Link>
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "rgba(255,255,255,0.5)",
              borderRadius: "8px",
              borderLeft: "4px solid #1565c0",
            }}
          >
            <h5 style={{ color: "#1565c0", fontWeight: 700, marginBottom: "10px" }}>
              Admission Committee :
            </h5>
            <div style={{ fontWeight: 600 }}>
              <p style={{ marginBottom: "5px" }}>
                +91 - 8826883338, +91 - 8826883339,
              </p>
              <p style={{ marginBottom: "5px" }}>
                +91 - 9220925051, +91 - 9667507437
              </p>
              <p style={{ marginBottom: "0" }}>
                <a
                  href="mailto:mca@bvicam.ac.in"
                  style={{ color: "#1565c0", textDecoration: "none" }}
                >
                  mca@bvicam.ac.in
                </a>
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            to="/apply"
            style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
              color: "#fff",
              padding: "12px 40px",
              borderRadius: 30,
              fontSize: "1rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(21,101,192,0.3)",
              transition: "transform .2s, box-shadow .2s",
              letterSpacing: 0.5,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(21,101,192,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(21,101,192,0.3)";
            }}
          >
            Admission Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
