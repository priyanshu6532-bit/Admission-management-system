import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BVILogo from "../assets/images/BVI.png";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const navItems = [
    { label: "Notices", badge: true, dropdown: ["Academic Notices", "Administrative Notices", "Examination Notices"] },
    { label: "Home", link: "/" },
    {
      label: "About Us",
      dropdown: ["About BVP", "About BVICAM", "Director", "Vision & Mission", "Governing Body"],
    },
    {
      label: "Academics",
      dropdown: ["MCA Programme", "BA (JMC) Programme", "Syllabus", "Faculty", "Research"],
    },
    {
      label: "Infrastructure",
      dropdown: ["Computer Labs", "Library", "Seminar Hall", "Sports Facilities"],
    },
    {
      label: "Activities",
      dropdown: ["Cultural Events", "Technical Events", "Clubs & Societies", "NSS"],
    },
    {
      label: "Placements",
      dropdown: ["Placement Cell", "Top Recruiters", "Placement Statistics", "Internships"],
    },
    {
      label: "Publications",
      dropdown: ["Journals", "Newsletters", "Conference Proceedings"],
    },
    { label: "Alumni", link: "#" },
    { label: "Press Release", link: "#" },
    {
      label: "Incubation",
      dropdown: ["Incubation Centre", "Startups", "Events"],
    },
    { label: "Mgmt. Quota 2025-26", link: "/apply", highlight: true },
  ];

  return (
    <header style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* ── Unified Top Bar: Logo (left) | College Name (center) | Social + Login (right) ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e0e0e0",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          minHeight: 90,
        }}
      >
        {/* Logo — left */}
        <div style={{ flexShrink: 0, zIndex: 1 }}>
          <Link to="/">
            <img src={BVILogo} alt="BVICAM Logo" style={{ height: 72 }} />
          </Link>
        </div>

        {/* College Name — absolutely centered */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              color: "#1a237e",
              fontWeight: 700,
              fontSize: "1.35rem",
              lineHeight: 1.3,
            }}
          >
            Bharati Vidyapeeth's Institute of
          </div>
          <div
            style={{
              color: "#1a237e",
              fontWeight: 700,
              fontSize: "1.35rem",
              lineHeight: 1.3,
            }}
          >
            Computer Applications and Management (BVICAM)
          </div>
          <div style={{ color: "#1a237e", fontWeight: 600, fontSize: "1.1rem" }}>
            MCA | BA(JMC)
          </div>
        </div>

        {/* Social Icons + Login — right */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          {[
            { icon: "bi-facebook", color: "#1877f2", href: "#" },
            { icon: "bi-twitter-x", color: "#000", href: "#" },
            { icon: "bi-youtube", color: "#ff0000", href: "#" },
            { icon: "bi-instagram", color: "#e1306c", href: "#" },
            { icon: "bi-linkedin", color: "#0a66c2", href: "#" },
            { icon: "bi-whatsapp", color: "#25d366", href: "#" },
          ].map((s) => (
            <a
              key={s.icon}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              style={{
                width: 28,
                height: 28,
                borderRadius: 4,
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <i className={`bi ${s.icon}`}></i>
            </a>
          ))}
          {/* Login button */}
          <Link
            to="/login"
            style={{
              background: "#c0392b",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "4px 18px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              marginLeft: 6,
            }}
          >
            Login
          </Link>
        </div>
      </div>

      {/* ── Blue Navigation Bar — evenly distributed ── */}
      <nav
        style={{
          background: "linear-gradient(90deg,#1565c0 0%,#1976d2 100%)",
          padding: "0 12px",
          position: "relative",
          zIndex: 1000,
        }}
      >
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {navItems.map((item) => (
            <li
              key={item.label}
              style={{ position: "relative", flex: "1 1 0", textAlign: "center" }}
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
              onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
            >
              {item.link ? (
                <Link
                  to={item.link}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    padding: "10px 8px",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "0.82rem",
                    fontWeight: item.highlight ? 700 : 500,
                    background: item.highlight ? "rgba(255,255,255,0.15)" : "transparent",
                    borderRadius: item.highlight ? 3 : 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => toggleDropdown(item.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    padding: "10px 8px",
                    color: "#fff",
                    background: "transparent",
                    border: "none",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {item.badge && (
                    <span
                      style={{
                        background: "#e53935",
                        color: "#fff",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        padding: "1px 5px",
                        borderRadius: 3,
                        marginRight: 3,
                        letterSpacing: 0.5,
                      }}
                    >
                      NEW
                    </span>
                  )}
                  {item.label}
                  <i className="bi bi-chevron-down" style={{ fontSize: "0.65rem" }}></i>
                </button>
              )}

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.label && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#1565c0",
                    listStyle: "none",
                    margin: 0,
                    padding: "4px 0",
                    minWidth: 200,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    borderTop: "2px solid #ffd600",
                    zIndex: 2000,
                  }}
                >
                  {item.dropdown.map((sub) => (
                    <li key={sub}>
                      <a
                        href="#"
                        style={{
                          display: "block",
                          padding: "7px 18px",
                          color: "#fff",
                          textDecoration: "none",
                          fontSize: "0.81rem",
                          borderBottom: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onMouseEnter={(e) => (e.target.style.background = "#0d47a1")}
                        onMouseLeave={(e) => (e.target.style.background = "transparent")}
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

