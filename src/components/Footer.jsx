import { Link } from "react-router-dom";

function Footer() {
  const linkGroups = [
    {
      title: "Important Links",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "SGRC", href: "#" },
        { label: "NIRF Data", href: "#" },
        { label: "Mandatory Disclosure - Academic Audit", href: "#" },
        { label: "Blog", href: "#" },
        { label: "AICTE Scholarship/Fellowship Schemes", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Important Links",
      links: [
        { label: "Grievances Redressal", href: "#" },
        { label: "GGSIPU", href: "#" },
        { label: "BVP", href: "#" },
        { label: "UGC", href: "#" },
        { label: "AICTE (Mandatory Disclosures)", href: "#" },
        { label: "AICTE (EoA)", href: "#" },
        { label: "Feedback to AICTE", href: "#" },
      ],
    },
  ];

  return (
    <footer style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* ── Top Section: Links + Map ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #bbdefb 0%, #90caf9 100%)",
          padding: "40px 24px",
          color: "#0d47a1",
        }}
      >
        <div className="container">
          <div className="row g-4">
            {/* Link Columns */}
            {linkGroups.map((group, idx) => (
              <div key={idx} className="col-md-3 col-sm-6">
                <h5 style={{ fontWeight: 700, marginBottom: "20px" }}>{group.title}</h5>
                <ul className="list-unstyled">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx} style={{ marginBottom: "8px" }}>
                      <Link
                        to={link.href}
                        style={{
                          color: "#0d47a1",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Empty center for logos (as requested to be left out) */}
            <div className="col-md-2 d-none d-md-block"></div>

            {/* Map Column */}
            <div className="col-md-4">
              <div
                style={{
                  background: "#fff",
                  padding: "4px",
                  borderRadius: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <iframe
                  title="BVICAM Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.970155551378!2d77.10842217529!3d28.67557117563969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d039017646a77%3A0xc3c94f57264a77a7!2sBharati%20Vidyapeeth&#39;s%20Institute%20of%20Computer%20Applications%20and%20Management%20(BVICAM)!5e0!3m2!1sen!2sin!4v1715077000000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: "2px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle Bar: Contact Info ── */}
      <div
        style={{
          background: "#1565c0",
          color: "#fff",
          padding: "15px 0",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div className="container">
          <div className="row align-items-center text-center g-3">
            <div className="col-lg-4 col-md-12">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-geo-alt-fill" style={{ fontSize: "1.2rem", color: "#ffd600" }}></i>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  A-4, Paschim Vihar, Rohtak Road, New Delhi - 110063 (INDIA)
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-telephone-fill" style={{ fontSize: "1.2rem", color: "#ffd600" }}></i>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  +91-8826883338, +91-8826883339
                </span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-envelope-fill" style={{ fontSize: "1.2rem", color: "#ffd600" }}></i>
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>mca@bvicam.ac.in</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-12">
              <a
                href="#"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <i className="bi bi-binoculars-fill" style={{ fontSize: "1.2rem", color: "#ffd600" }}></i>
                Virtual Tour
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar: Copyright ── */}
      <div
        style={{
          background: "#0d47a1",
          color: "#e3f2fd",
          padding: "10px 0",
          textAlign: "center",
          fontSize: "0.85rem",
        }}
      >
        <div className="container">Copyright © 2024 BVICAM, New Delhi</div>
      </div>
    </footer>
  );
}

export default Footer;
