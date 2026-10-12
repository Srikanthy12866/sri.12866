import React, { useState, useMemo, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { products, meta, socialprofils } from "../../content_option";
import { useTranslation } from "react-i18next";
import {
  FiExternalLink,
  FiGithub,
  FiSearch,
  FiCheckCircle,
  FiLayers,
  FiCpu,
  FiActivity,
  FiX,
  FiDownload,
  FiAlertTriangle,
  FiFileText,
  FiTerminal,
} from "react-icons/fi";
import { SiUbuntu, SiDebian, SiLinux } from "react-icons/si";
import { UbuntuDownloadCenter } from "../../components/UbuntuDownloadCenter/UbuntuDownloadCenter";

// Detect Client Operating System with specific Ubuntu recognition
export const detectClientOS = () => {
  if (typeof window === "undefined" || !window.navigator) {
    return { name: "Unknown OS", isUbuntu: false, isLinuxFamily: false };
  }

  const userAgent = window.navigator.userAgent || "";
  const platform = window.navigator.platform || "";

  // 1. Android
  if (/Android/i.test(userAgent)) {
    return { name: "Android", isUbuntu: false, isLinuxFamily: false };
  }

  // 2. iOS
  if (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (platform === "MacIntel" && window.navigator.maxTouchPoints > 1)
  ) {
    return { name: "iOS", isUbuntu: false, isLinuxFamily: false };
  }

  // 3. macOS
  if (
    /Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform) ||
    /Mac OS X/i.test(userAgent)
  ) {
    return { name: "macOS", isUbuntu: false, isLinuxFamily: false };
  }

  // 4. Windows
  if (
    /Win32|Win64|Windows|WinCE/i.test(platform) ||
    /Windows NT|Win64|WOW64/i.test(userAgent)
  ) {
    let winVer = "Windows";
    if (/Windows NT 10.0/i.test(userAgent)) winVer = "Windows 10/11";
    else if (/Windows NT 6.3/i.test(userAgent)) winVer = "Windows 8.1";
    else if (/Windows NT 6.1/i.test(userAgent)) winVer = "Windows 7";
    return { name: winVer, isUbuntu: false, isLinuxFamily: false };
  }

  // 5. Linux Family (Ubuntu, Debian, Fedora, Arch, CentOS, generic Linux, X11)
  if (
    /Linux|X11/i.test(platform) ||
    /Linux|X11|Ubuntu|Debian|Fedora|CentOS|RedHat/i.test(userAgent)
  ) {
    const isUbuntuExplicit = /Ubuntu/i.test(userAgent) || /Ubuntu/i.test(platform);
    let linuxDistro = "Ubuntu Linux";
    if (isUbuntuExplicit) linuxDistro = "Ubuntu Linux";
    else if (/Debian/i.test(userAgent)) linuxDistro = "Debian Linux";
    else if (/Fedora/i.test(userAgent)) linuxDistro = "Fedora Linux";
    else if (/Arch/i.test(userAgent)) linuxDistro = "Arch Linux";
    else linuxDistro = "Linux (Ubuntu Compatible)";

    return {
      name: linuxDistro,
      isUbuntu: isUbuntuExplicit || linuxDistro.includes("Ubuntu") || true,
      isLinuxFamily: true,
    };
  }

  return { name: "Unknown OS", isUbuntu: false, isLinuxFamily: false };
};

// Generate comprehensive Ubuntu / Linux User Guide
const generateUserGuide = (product) => {
  const prodTitle = product?.title || "Go Seeker";
  const repoUrl =
    product?.github || "https://github.com/Srikanthy12866/DEEP_HARDWARE_SEEKER";

  return `================================================================================
                    ${prodTitle.toUpperCase()} - USER GUIDE & QUICK START
            Deep Hardware Diagnostic Suite for Ubuntu / Linux
================================================================================

Repository: ${repoUrl}
Platform:   Ubuntu 20.04 / 22.04 / 24.04 LTS (and Debian/Linux family)
Runtime:    Node.js (>= 18.x), Electron, React

--------------------------------------------------------------------------------
1. SYSTEM REQUIREMENTS & PREREQUISITES
--------------------------------------------------------------------------------
- Operating System: Ubuntu, Debian, Fedora, Arch Linux (x86_64 or ARM64)
- Linux Kernel: 5.x or 6.x with readable /sys/devices and /proc interfaces
- Node.js & npm: Node.js 18 or newer recommended
- Build Tools: build-essential (gcc, g++, make)

Install dependencies on Ubuntu/Debian:
  $ sudo apt update
  $ sudo apt install -y curl git build-essential

--------------------------------------------------------------------------------
2. INSTALLATION & SETUP
--------------------------------------------------------------------------------
Step 1: Extract the downloaded archive or clone the repository:
  $ git clone ${repoUrl}.git
  $ cd DEEP_HARDWARE_SEEKER

Step 2: Install project dependencies:
  $ npm install

--------------------------------------------------------------------------------
3. RUNNING THE APPLICATION
--------------------------------------------------------------------------------
Option A: Full Desktop Mode (Electron with real-time kernel telemetry):
  $ npm run desktop
  This starts the React UI and opens the native Electron window. It queries
  CPU per-core clock frequencies, cache topologies, memory DIMM modules,
  GPU controllers, and baseboard specs once every second.

Option B: Browser Development Preview:
  $ npm start
  Opens http://localhost:3000. Note: Browser-only mode cannot read low-level
  kernel /sys paths and will indicate that firmware and core details require
  the desktop Electron bridge.

--------------------------------------------------------------------------------
4. BUILDING STANDALONE UBUNTU PACKAGES (.deb / .AppImage)
--------------------------------------------------------------------------------
To package ${prodTitle} as a standalone native Ubuntu application:
  $ npm run desktop:build

Output packages will be generated in dist/:
  - .deb package: Install with:
      $ sudo dpkg -i dist/*.deb
  - .AppImage: Run directly with:
      $ chmod +x dist/*.AppImage && ./dist/*.AppImage

For Raspberry Pi / ARM64 Linux:
  $ npm run desktop:linux-arm64

--------------------------------------------------------------------------------
5. PERMISSIONS & KERNEL METRICS
--------------------------------------------------------------------------------
${prodTitle} reads hardware metrics directly from local host interfaces:
  - CPU Clock / Frequency: /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
  - Memory & DIMMs: dmidecode / sysfs memory interfaces
  - Battery / Thermal: /sys/class/power_supply and /sys/class/thermal
No root privileges are required for standard monitoring.

================================================================================
Generated for: Srikanth Yepalagunta - ${prodTitle} Project
================================================================================`;
};

// Utility to trigger client-side text file download
const triggerFileDownload = (content, filename, mimeType = "text/plain") => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const Products = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);

  // Client OS Detection State
  const [detectedOS, setDetectedOS] = useState(() => detectClientOS());

  useEffect(() => {
    setDetectedOS(detectClientOS());
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.techStack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Open product modal
  const handleOpenProduct = (product, focusDownload = false) => {
    setActiveProduct(product);
    if (focusDownload) {
      setTimeout(() => {
        const el = document.getElementById("ubuntu-download-center");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 180);
    }
  };

  // OS Verification & Download Handler: opens Ubuntu Download Center on the website
  const handleDownload = (product = activeProduct) => {
    if (!product) return;
    const os = detectClientOS();
    setDetectedOS(os);
    handleOpenProduct(product, true);
  };

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <HelmetProvider>
      <Container className="About-header products_section pb-5">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Products | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>

        {/* Section Header */}
        <Row className="mb-4 mt-3 pt-md-3">
          <Col lg="10">
            <h1 className="display-4 mb-2 products-main-title">
              {t("products_title")}
            </h1>
            <p className="products-subtitle text-muted">
              {t("products_subtitle")}
            </p>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        {/* Search & Filter Toolbar */}
        <div className="products-toolbar mb-5">
          <div className="products-search-wrapper mb-3 mb-md-0">
            <FiSearch className="search-icon" />
            <input
              type="text"
              id="product-search-input"
              className="products-search-input"
              placeholder={t("search_products")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="products-filter-pills">
            {categories.map((category) => {
              const count =
                category === "All"
                  ? products.length
                  : products.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  className={`filter-pill ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span>
                    {category === "All" ? t("all_categories") : category}
                  </span>
                  <span className="pill-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products-box text-center py-5">
            <FiCpu className="empty-icon mb-3" />
            <h3 className="h4">{t("no_products_found")}</h3>
            <p className="text-muted">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              className="btn btn-outline-secondary mt-3 px-4 py-2"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              {t("reset_filters")}
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const isSingle = filteredProducts.length === 1;
              return (
                <div
                  key={product.id}
                  className={`product-card ${isSingle ? "featured-single" : ""}`}
                  onClick={() => handleOpenProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenProduct(product);
                    }
                  }}
                >
                  {/* Media Image / Banner */}
                  <div className="product-media">
                    <img
                      src={product.img}
                      alt={product.title}
                      loading="lazy"
                      className="product-image"
                    />
                    <div className="media-overlay"></div>
                    <div className="product-badge-group">
                      <span className="product-category-tag">
                        {product.category}
                      </span>
                      <span className="product-status-indicator">
                        <span className="pulse-dot"></span>
                        {product.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="product-body">
                    <div className="product-header">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-tagline">{product.tagline}</p>
                    </div>

                    <p className="product-description-snippet">
                      {product.description}
                    </p>

                    {/* Highlights / Features Preview */}
                    <div className="product-features-snippet">
                      {product.features
                        .slice(0, isSingle ? 4 : 2)
                        .map((feat, idx) => (
                          <div key={idx} className="feature-snippet-item">
                            <FiCheckCircle className="check-icon me-2" />
                            <span>{feat}</span>
                          </div>
                        ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="product-tech-chips">
                      {(isSingle
                        ? product.techStack
                        : product.techStack.slice(0, 4)
                      ).map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                      {!isSingle && product.techStack.length > 4 && (
                        <span className="tech-badge-more">
                          +{product.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div
                      className="product-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="product-btn-primary"
                        onClick={() => handleOpenProduct(product)}
                      >
                        <FiLayers className="me-2" />
                        {t("quick_view")}
                      </button>

                      <button
                        className="product-btn-download"
                        onClick={() => handleDownload(product)}
                        title="Download for Ubuntu / Linux (.deb, AppImage & Installation Details)"
                      >
                        <SiUbuntu className="me-1 ubuntu-card-icon" />
                        Download
                      </button>

                      <a
                        href={product.github || socialprofils.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="product-btn-icon"
                        title={t("view_code")}
                        aria-label={`${product.title} GitHub repository`}
                      >
                        <FiGithub />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Product Quick View Modal */}
        {activeProduct && (
          <Modal
            show={!!activeProduct}
            onHide={() => setActiveProduct(null)}
            size="lg"
            centered
            className="product-detail-modal"
          >
            <div className="modal-content-glass">
              <div className="modal-header-custom">
                <div className="modal-title-group">
                  <span className="modal-category-badge">
                    {activeProduct.category}
                  </span>
                  <h2 className="modal-product-title mt-1">
                    {activeProduct.title}
                  </h2>
                  <p className="modal-product-tagline text-muted mb-0">
                    {activeProduct.tagline}
                  </p>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setActiveProduct(null)}
                  aria-label="Close"
                >
                  <FiX />
                </button>
              </div>

              <div className="modal-body-custom">
                {/* Modal Visual Banner */}
                <div className="modal-banner-img-wrap mb-4">
                  <img
                    src={activeProduct.img}
                    alt={activeProduct.title}
                    className="modal-banner-img"
                  />
                  <div className="modal-banner-overlay">
                    {activeProduct.stats && (
                      <div className="modal-stats-bar">
                        {Object.entries(activeProduct.stats).map(
                          ([key, value]) => (
                            <div key={key} className="stat-item">
                              <span className="stat-label">
                                {key.toUpperCase()}
                              </span>
                              <span className="stat-value">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ubuntu Download Center: Available APP Files, .deb Package, and Installation Details fetched from GitHub */}
                <UbuntuDownloadCenter
                  product={activeProduct}
                  clientOS={detectedOS}
                  isUbuntuDetected={detectedOS?.isUbuntu || detectedOS?.isLinuxFamily}
                  onGuideDownload={() =>
                    triggerFileDownload(
                      generateUserGuide(activeProduct),
                      `${activeProduct.title.replace(
                        /\s+/g,
                        "_"
                      )}_Ubuntu_User_Guide.txt`
                    )
                  }
                />

                {/* Overview Description */}
                <div className="modal-section mb-4">
                  <h4 className="modal-section-title">
                    <FiActivity className="me-2" />
                    Overview
                  </h4>
                  <p className="modal-desc-text">{activeProduct.description}</p>
                </div>

                {/* Architecture Details */}
                {activeProduct.architecture && (
                  <div className="modal-section mb-4">
                    <h4 className="modal-section-title">
                      <FiCpu className="me-2" />
                      {t("architecture_overview")}
                    </h4>
                    <div className="architecture-box">
                      <p className="mb-0">{activeProduct.architecture}</p>
                    </div>
                  </div>
                )}

                {/* Key Features */}
                <div className="modal-section mb-4">
                  <h4 className="modal-section-title">
                    <FiCheckCircle className="me-2" />
                    {t("key_capabilities")}
                  </h4>
                  <div className="modal-features-list">
                    {activeProduct.features.map((feat, idx) => (
                      <div key={idx} className="modal-feature-row">
                        <FiCheckCircle className="feature-check-icon" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="modal-section mb-4">
                  <h4 className="modal-section-title">
                    <FiLayers className="me-2" />
                    {t("tech_stack")}
                  </h4>
                  <div className="modal-tech-cloud">
                    {activeProduct.techStack.map((tech, idx) => (
                      <span key={idx} className="modal-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer-custom">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <button
                    className="modal-action-btn primary download-footer-btn"
                    onClick={() => {
                      const el = document.getElementById("ubuntu-download-center");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <SiUbuntu className="me-2" />
                    Ubuntu & Linux Downloads
                  </button>
                  <a
                    href={activeProduct.github || socialprofils.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action-btn secondary"
                  >
                    <FiGithub className="me-2" />
                    {t("view_code")}
                  </a>
                  {activeProduct.link && activeProduct.link !== "#" && (
                    <a
                      href={activeProduct.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn secondary"
                    >
                      <FiExternalLink className="me-2" />
                      Repository Overview
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </HelmetProvider>
  );
};

// Also export as Portfolio for backward compatibility
export const Portfolio = Products;
export default Products;
