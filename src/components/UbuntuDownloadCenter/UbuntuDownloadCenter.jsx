import React, { useState, useEffect, useCallback } from "react";
import "./style.css";
import {
  FiDownload,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiGithub,
  FiTerminal,
  FiRefreshCw,
  FiAlertTriangle,
  FiCpu,
  FiLayers,
  FiBox,
  FiInfo,
  FiCheck,
} from "react-icons/fi";
import { SiUbuntu, SiDebian, SiLinux } from "react-icons/si";
import {
  fetchGithubRepoDetails,
  timeAgo,
} from "../../utils/githubService";

export const UbuntuDownloadCenter = ({
  product,
  clientOS,
  onGuideDownload,
  isUbuntuDetected,
}) => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("deb"); // 'deb' | 'appimage' | 'source' | 'telemetry'
  const [arch, setArch] = useState("amd64"); // 'amd64' | 'arm64'
  const [copiedId, setCopiedId] = useState(null);
  const [notification, setNotification] = useState(null);

  // Allow users on non-Ubuntu to preview Ubuntu details
  const [forceUbuntuView, setForceUbuntuView] = useState(isUbuntuDetected);

  const repoUrl =
    product?.github || "https://github.com/Srikanthy12866/DEEP_HARDWARE_SEEKER";

  const loadData = useCallback(
    async (isManualRefresh = false) => {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);

      try {
        const data = await fetchGithubRepoDetails(repoUrl);
        setGithubData(data);
      } catch (err) {
        console.error("Failed to fetch GitHub details:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [repoUrl]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Keep view in sync if detected OS is Ubuntu
  useEffect(() => {
    if (isUbuntuDetected) {
      setForceUbuntuView(true);
    }
  }, [isUbuntuDetected]);

  // Copy helper
  const handleCopy = (text, id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  // Download trigger
  const handleDownloadFile = (fileItem) => {
    const filename =
      arch === "arm64" && fileItem.arm64FileName
        ? fileItem.arm64FileName
        : fileItem.fileName;

    const targetUrl =
      arch === "arm64" && fileItem.arm64DownloadUrl
        ? fileItem.arm64DownloadUrl
        : fileItem.downloadUrl;

    setNotification({
      title: `Starting Download: ${filename}`,
      message: `Fetching ${fileItem.badge} package from GitHub repository...`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4500);

    // Trigger download
    const link = document.createElement("a");
    link.href = targetUrl;
    link.setAttribute("download", filename);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const version = githubData?.version || "0.1.0";
  const productName =
    githubData?.productName || product?.title || "Fieldnote Device Report";
  const commit = githubData?.latestCommit || {};
  const debFile =
    githubData?.availableFiles?.find((f) => f.type === "deb") || {};
  const appImageFile =
    githubData?.availableFiles?.find((f) => f.type === "appimage") || {};
  const sourceFile =
    githubData?.availableFiles?.find((f) => f.type === "source") || {};

  return (
    <div className="ubuntu-download-center" id="ubuntu-download-center">
      {/* Toast Notification */}
      {notification && (
        <div className="download-toast-banner" role="status">
          <FiCheckCircle className="toast-icon me-2" />
          <div className="toast-text">
            <strong>{notification.title}</strong>
            <p className="mb-0 small">{notification.message}</p>
          </div>
        </div>
      )}

      {/* OS Verification Header Bar */}
      <div className="ubuntu-header-card mb-4">
        <div className="ubuntu-header-top d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="ubuntu-circle-logo">
              <SiUbuntu className="ubuntu-brand-icon" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h3 className="ubuntu-title mb-0">Ubuntu & Linux Download Center</h3>
                <span className="ubuntu-distro-pill">
                  <SiDebian className="me-1" />
                  Ubuntu 24.04 / 22.04 / 20.04 LTS
                </span>
              </div>
              <p className="ubuntu-subtitle text-muted mb-0 mt-1">
                Deep Hardware Telemetry Suite for Debian / Ubuntu Linux hosts
              </p>
            </div>
          </div>

          {/* OS Badge & Switcher */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {isUbuntuDetected || forceUbuntuView ? (
              <div className="detected-os-pill verified">
                <span className="pulse-indicator"></span>
                <SiUbuntu className="os-mini-icon" />
                <span>
                  {isUbuntuDetected
                    ? `Detected: ${clientOS?.name || "Ubuntu Linux"}`
                    : "Simulated OS: Ubuntu Linux"}
                </span>
              </div>
            ) : (
              <div className="detected-os-pill non-linux">
                <FiAlertTriangle className="os-mini-icon text-warning" />
                <span>Detected: {clientOS?.name || "Non-Linux OS"}</span>
              </div>
            )}

            {!isUbuntuDetected && (
              <button
                className={`btn btn-sm ${
                  forceUbuntuView ? "btn-outline-primary" : "btn-primary"
                } ubuntu-toggle-view-btn`}
                onClick={() => setForceUbuntuView(!forceUbuntuView)}
                title="Switch between your detected OS and Ubuntu view"
              >
                {forceUbuntuView
                  ? "View Detected OS Advisory"
                  : "View Ubuntu Packages (.deb & AppImage)"}
              </button>
            )}
          </div>
        </div>

        {/* Non-Linux Warning Notice when not forcing view */}
        {!isUbuntuDetected && !forceUbuntuView && (
          <div className="os-notice-callout mt-3">
            <div className="d-flex align-items-start gap-3">
              <FiAlertTriangle className="text-warning mt-1 fs-5 flex-shrink-0" />
              <div className="flex-grow-1">
                <h6 className="mb-1 text-warning fw-bold">
                  Running on {clientOS?.name || "a non-Ubuntu system"}
                </h6>
                <p className="small mb-2 text-muted">
                  <strong>{product?.title}</strong> accesses native Linux kernel{" "}
                  <code>/sys/devices</code> and driver interfaces. While you are
                  on {clientOS?.name}, you can still download the available{" "}
                  <strong>.deb package</strong>, <strong>.AppImage</strong>, and view
                  full Ubuntu installation details below.
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setForceUbuntuView(true)}
                  >
                    <SiUbuntu className="me-1" />
                    Show Available Ubuntu Files & deb Packages
                  </button>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <FiGithub className="me-1" /> View GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GitHub Live Status Strip */}
        <div className="github-live-strip mt-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="github-meta-group d-flex align-items-center gap-3 flex-wrap">
              <span className="live-status-indicator">
                <span className="live-dot"></span>
                {githubData?.isLive ? "Live from GitHub" : "GitHub Synced"}
              </span>

              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-link-badge"
              >
                <FiGithub className="me-1" />
                {githubData?.owner}/{githubData?.repo}
                <FiExternalLink className="ms-1 small" />
              </a>

              <span className="commit-badge">
                <FiTerminal className="me-1" />
                <code>{commit?.sha || "main"}</code>
                {commit?.message && (
                  <span className="commit-msg"> — "{commit.message}"</span>
                )}
                {commit?.date && (
                  <span className="commit-time"> ({timeAgo(commit.date)})</span>
                )}
              </span>

              <span className="version-pill">
                v{version} (package.json)
              </span>
            </div>

            <button
              className="btn btn-sm refresh-github-btn"
              onClick={() => loadData(true)}
              disabled={refreshing || loading}
              title="Re-fetch latest metadata from GitHub"
            >
              <FiRefreshCw
                className={`me-1 ${refreshing ? "spin-animation" : ""}`}
              />
              {refreshing ? "Fetching..." : "Sync GitHub"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Files & Details Section */}
      {(isUbuntuDetected || forceUbuntuView) && (
        <div className="ubuntu-content-area">
          {/* Architecture Switcher */}
          <div className="arch-selector-bar mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span className="arch-label text-muted small fw-bold">
              TARGET HARDWARE ARCHITECTURE:
            </span>
            <div className="btn-group btn-group-sm arch-toggle-group">
              <button
                type="button"
                className={`btn ${
                  arch === "amd64" ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setArch("amd64")}
              >
                x86_64 / amd64 (Standard PC & Laptops)
              </button>
              <button
                type="button"
                className={`btn ${
                  arch === "arm64" ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setArch("arm64")}
              >
                arm64 (Raspberry Pi 4/5 & ARM Linux)
              </button>
            </div>
          </div>

          {/* Available Files Cards Grid */}
          <div className="available-files-grid mb-4">
            {/* 1. Debian Package (.deb) */}
            <div className="file-download-card deb-card">
              <div className="card-top-badge">
                <span className="badge-chip deb-chip">
                  <SiDebian className="me-1" />
                  Official .deb Package
                </span>
                <span className="badge-chip arch-chip">{arch}</span>
              </div>

              <div className="card-file-body">
                <div className="file-icon-box deb-icon-box">
                  <SiUbuntu />
                </div>
                <div className="file-meta">
                  <h4 className="file-title">
                    Debian / Ubuntu Package (.deb)
                  </h4>
                  <p className="file-filename mb-1">
                    <code>
                      {arch === "arm64" && debFile.arm64FileName
                        ? debFile.arm64FileName
                        : debFile.fileName || "Fieldnote-Device-Report-0.1.0-amd64.deb"}
                    </code>
                  </p>
                  <p className="file-specs text-muted small mb-0">
                    Size: {debFile.size || "~85.2 MB"} • Format: Debian Binary (.deb)
                  </p>
                </div>
              </div>

              <p className="file-description small text-muted my-3">
                Pre-compiled native Ubuntu installer with desktop integration, system
                service hooks, and sandboxed Electron kernel telemetry collector.
              </p>

              <div className="file-actions-row">
                <button
                  className="btn btn-primary download-file-btn"
                  onClick={() => handleDownloadFile(debFile)}
                  title="Download .deb package"
                >
                  <FiDownload className="me-2" />
                  Download .deb ({arch})
                </button>

                <button
                  className="btn btn-outline-secondary copy-cmd-btn"
                  onClick={() =>
                    handleCopy(
                      `sudo dpkg -i ${
                        arch === "arm64" && debFile.arm64FileName
                          ? debFile.arm64FileName
                          : debFile.fileName || "Fieldnote-Device-Report-0.1.0-amd64.deb"
                      }`,
                      "copy-deb-btn"
                    )
                  }
                  title="Copy dpkg install command"
                >
                  {copiedId === "copy-deb-btn" ? (
                    <>
                      <FiCheck className="me-1 text-success" /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="me-1" /> Copy dpkg cmd
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Portable Linux App (.AppImage) */}
            <div className="file-download-card appimage-card">
              <div className="card-top-badge">
                <span className="badge-chip appimage-chip">
                  <SiLinux className="me-1" />
                  Standalone App (.AppImage)
                </span>
                <span className="badge-chip portable-chip">Zero Install</span>
              </div>

              <div className="card-file-body">
                <div className="file-icon-box appimage-icon-box">
                  <SiLinux />
                </div>
                <div className="file-meta">
                  <h4 className="file-title">
                    Universal Portable Linux (.AppImage)
                  </h4>
                  <p className="file-filename mb-1">
                    <code>
                      {appImageFile.fileName ||
                        "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"}
                    </code>
                  </p>
                  <p className="file-specs text-muted small mb-0">
                    Size: {appImageFile.size || "~92.4 MB"} • Format: Linux Executable
                  </p>
                </div>
              </div>

              <p className="file-description small text-muted my-3">
                Single-file portable binary. Runs directly without root privileges.
                Self-contained with all Electron runtimes and hardware readers.
              </p>

              <div className="file-actions-row">
                <button
                  className="btn btn-primary download-file-btn"
                  onClick={() => handleDownloadFile(appImageFile)}
                  title="Download .AppImage package"
                >
                  <FiDownload className="me-2" />
                  Download .AppImage
                </button>

                <button
                  className="btn btn-outline-secondary copy-cmd-btn"
                  onClick={() =>
                    handleCopy(
                      `chmod +x ${
                        appImageFile.fileName ||
                        "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"
                      } && ./${
                        appImageFile.fileName ||
                        "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"
                      }`,
                      "copy-appimage-btn"
                    )
                  }
                  title="Copy chmod and run command"
                >
                  {copiedId === "copy-appimage-btn" ? (
                    <>
                      <FiCheck className="me-1 text-success" /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy className="me-1" /> Copy run cmd
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3. GitHub Desktop Source Package (.zip) */}
            <div className="file-download-card source-card">
              <div className="card-top-badge">
                <span className="badge-chip source-chip">
                  <FiGithub className="me-1" />
                  GitHub Source (.zip)
                </span>
                <span className="badge-chip branch-chip">main</span>
              </div>

              <div className="card-file-body">
                <div className="file-icon-box source-icon-box">
                  <FiBox />
                </div>
                <div className="file-meta">
                  <h4 className="file-title">
                    Complete Desktop Source (.zip)
                  </h4>
                  <p className="file-filename mb-1">
                    <code>{sourceFile.fileName || "DEEP_HARDWARE_SEEKER-main.zip"}</code>
                  </p>
                  <p className="file-specs text-muted small mb-0">
                    Source: GitHub Archive • React + Electron IPC
                  </p>
                </div>
              </div>

              <p className="file-description small text-muted my-3">
                Full source code fetched live from GitHub main branch. Includes
                development launcher, build scripts, and native collector modules.
              </p>

              <div className="file-actions-row">
                <button
                  className="btn btn-outline-primary download-file-btn"
                  onClick={() => handleDownloadFile(sourceFile)}
                  title="Download source code archive"
                >
                  <FiDownload className="me-2" />
                  Download Source (.zip)
                </button>

                {onGuideDownload && (
                  <button
                    className="btn btn-outline-secondary copy-cmd-btn"
                    onClick={onGuideDownload}
                    title="Download offline user manual"
                  >
                    User Guide (.txt)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Installation Details Section */}
          <div className="installation-guide-box">
            <div className="guide-header-strip d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <FiTerminal className="guide-terminal-icon text-primary" />
                <h4 className="guide-title mb-0">
                  Installation Details & Terminal Guide
                </h4>
              </div>
              <span className="text-muted small">
                Commands tested on Ubuntu 20.04 / 22.04 / 24.04 LTS
              </span>
            </div>

            {/* Installation Navigation Tabs */}
            <div className="guide-tabs-nav mb-3">
              <button
                className={`guide-tab-btn ${activeTab === "deb" ? "active" : ""}`}
                onClick={() => setActiveTab("deb")}
              >
                <SiDebian className="me-1" />
                Option 1: .deb Package (Recommended)
              </button>
              <button
                className={`guide-tab-btn ${
                  activeTab === "appimage" ? "active" : ""
                }`}
                onClick={() => setActiveTab("appimage")}
              >
                <SiLinux className="me-1" />
                Option 2: .AppImage Portable
              </button>
              <button
                className={`guide-tab-btn ${
                  activeTab === "source" ? "active" : ""
                }`}
                onClick={() => setActiveTab("source")}
              >
                <FiGithub className="me-1" />
                Option 3: Build from GitHub
              </button>
              <button
                className={`guide-tab-btn ${
                  activeTab === "telemetry" ? "active" : ""
                }`}
                onClick={() => setActiveTab("telemetry")}
              >
                <FiCpu className="me-1" />
                Option 4: Kernel & sysfs Setup
              </button>
            </div>

            {/* Tab 1: DEB Installation Details */}
            {activeTab === "deb" && (
              <div className="tab-pane-content">
                <div className="step-card mb-3">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h6 className="step-heading">
                      Navigate to your download folder & install with dpkg
                    </h6>
                    <p className="small text-muted mb-2">
                      Open your Ubuntu terminal (<code>Ctrl + Alt + T</code>) and run
                      the Debian package installer:
                    </p>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">bash — terminal</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              `cd ~/Downloads\nsudo dpkg -i ${
                                arch === "arm64" && debFile.arm64FileName
                                  ? debFile.arm64FileName
                                  : debFile.fileName || "Fieldnote-Device-Report-0.1.0-amd64.deb"
                              }`,
                              "cmd-dpkg"
                            )
                          }
                        >
                          {copiedId === "cmd-dpkg" ? (
                            <>
                              <FiCheck className="me-1 text-success" /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy className="me-1" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>cd ~/Downloads
                          {"\n"}
                          <span className="cmd-prompt">$ </span>sudo dpkg -i{" "}
                          {arch === "arm64" && debFile.arm64FileName
                            ? debFile.arm64FileName
                            : debFile.fileName ||
                              "Fieldnote-Device-Report-0.1.0-amd64.deb"}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="step-card mb-3">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h6 className="step-heading">
                      Resolve any missing shared library dependencies (apt fix)
                    </h6>
                    <p className="small text-muted mb-2">
                      If Ubuntu reports missing packages, APT will resolve and
                      configure them automatically:
                    </p>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">bash — dependency fix</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              "sudo apt-get install -f -y",
                              "cmd-apt-fix"
                            )
                          }
                        >
                          {copiedId === "cmd-apt-fix" ? (
                            <>
                              <FiCheck className="me-1 text-success" /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy className="me-1" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>sudo apt-get install -f -y
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="step-card mb-3">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h6 className="step-heading">Launch the Hardware Suite</h6>
                    <p className="small text-muted mb-2">
                      Launch via the command line or search <strong>Fieldnote</strong> in
                      your Ubuntu Applications menu:
                    </p>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">bash — execute</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              "fieldnote-device-report",
                              "cmd-launch"
                            )
                          }
                        >
                          {copiedId === "cmd-launch" ? (
                            <>
                              <FiCheck className="me-1 text-success" /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy className="me-1" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>fieldnote-device-report
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Uninstall reference */}
                <div className="info-sub-box d-flex align-items-center justify-content-between flex-wrap gap-2 p-2 px-3">
                  <span className="small text-muted">
                    <FiInfo className="me-1" /> To uninstall at any time:{" "}
                    <code>sudo dpkg -r systems.fieldnote.device-report</code>
                  </span>
                  <button
                    className="btn btn-sm btn-link text-muted p-0"
                    onClick={() =>
                      handleCopy(
                        "sudo dpkg -r systems.fieldnote.device-report",
                        "cmd-uninstall"
                      )
                    }
                  >
                    {copiedId === "cmd-uninstall" ? "Copied!" : "Copy uninstall cmd"}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: AppImage Portable Execution */}
            {activeTab === "appimage" && (
              <div className="tab-pane-content">
                <div className="step-card mb-3">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h6 className="step-heading">
                      Grant execution permissions to the downloaded .AppImage
                    </h6>
                    <p className="small text-muted mb-2">
                      In Ubuntu, downloaded executables need permission before first run:
                    </p>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">bash — chmod permissions</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              `cd ~/Downloads\nchmod +x ${
                                appImageFile.fileName ||
                                "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"
                              }`,
                              "cmd-chmod"
                            )
                          }
                        >
                          {copiedId === "cmd-chmod" ? (
                            <>
                              <FiCheck className="me-1 text-success" /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy className="me-1" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>cd ~/Downloads
                          {"\n"}
                          <span className="cmd-prompt">$ </span>chmod +x{" "}
                          {appImageFile.fileName ||
                            "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="step-card mb-3">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h6 className="step-heading">Run the application</h6>
                    <p className="small text-muted mb-2">
                      Execute the AppImage directly from terminal or double click the
                      file in Ubuntu Files:
                    </p>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">bash — run AppImage</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              `./${
                                appImageFile.fileName ||
                                "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"
                              }`,
                              "cmd-run-appimage"
                            )
                          }
                        >
                          {copiedId === "cmd-run-appimage" ? (
                            <>
                              <FiCheck className="me-1 text-success" /> Copied
                            </>
                          ) : (
                            <>
                              <FiCopy className="me-1" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>./
                          {appImageFile.fileName ||
                            "Fieldnote-Device-Report-0.1.0-x86_64.AppImage"}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Ubuntu 22.04+ FUSE note */}
                <div className="info-sub-box p-3">
                  <h6 className="small fw-bold mb-1 text-warning">
                    <FiAlertTriangle className="me-1" /> Ubuntu 22.04 & 24.04 FUSE Requirement
                  </h6>
                  <p className="small text-muted mb-2">
                    Ubuntu 22.04+ does not ship with <code>libfuse2</code> by default.
                    If the AppImage does not launch, install it with one command:
                  </p>
                  <div className="terminal-box mb-0">
                    <div className="terminal-top">
                      <span className="term-title">Install libfuse2</span>
                      <button
                        className="copy-term-btn"
                        onClick={() =>
                          handleCopy(
                            "sudo apt update && sudo apt install -y libfuse2",
                            "cmd-fuse"
                          )
                        }
                      >
                        {copiedId === "cmd-fuse" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <pre className="terminal-code">
                      <code>
                        <span className="cmd-prompt">$ </span>sudo apt update && sudo apt install -y libfuse2
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Build & Package from GitHub Source */}
            {activeTab === "source" && (
              <div className="tab-pane-content">
                <div className="step-card mb-3">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h6 className="step-heading">
                      Install prerequisites on Ubuntu (Git & Node.js 18+)
                    </h6>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">Ubuntu build-essential</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              "sudo apt update && sudo apt install -y curl git build-essential",
                              "cmd-prereq"
                            )
                          }
                        >
                          {copiedId === "cmd-prereq" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>sudo apt update && sudo apt install -y curl git build-essential
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="step-card mb-3">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h6 className="step-heading">
                      Clone from GitHub & Install Node dependencies
                    </h6>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">Clone and Install</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              `git clone ${repoUrl}.git\ncd DEEP_HARDWARE_SEEKER\nnpm install`,
                              "cmd-clone"
                            )
                          }
                        >
                          {copiedId === "cmd-clone" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="cmd-prompt">$ </span>git clone {repoUrl}.git
                          {"\n"}
                          <span className="cmd-prompt">$ </span>cd DEEP_HARDWARE_SEEKER
                          {"\n"}
                          <span className="cmd-prompt">$ </span>npm install
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="step-card mb-3">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h6 className="step-heading">
                      Run live Desktop Mode or Build native .deb package
                    </h6>
                    <div className="terminal-box">
                      <div className="terminal-top">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="term-title">Live & Packaging commands</span>
                        <button
                          className="copy-term-btn"
                          onClick={() =>
                            handleCopy(
                              "# Live desktop development\nnpm run desktop\n\n# Build standalone Ubuntu .deb & .AppImage packages\nnpm run desktop:build\n\n# Build for ARM64 Raspberry Pi\nnpm run desktop:linux-arm64",
                              "cmd-build"
                            )
                          }
                        >
                          {copiedId === "cmd-build" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="terminal-code">
                        <code>
                          <span className="text-muted"># Live desktop development (Electron + React telemetry)</span>{"\n"}
                          <span className="cmd-prompt">$ </span>npm run desktop
                          {"\n\n"}
                          <span className="text-muted"># Package standalone Ubuntu .deb & .AppImage packages</span>{"\n"}
                          <span className="cmd-prompt">$ </span>npm run desktop:build
                          {"\n\n"}
                          <span className="text-muted"># Package for Raspberry Pi / Linux ARM64</span>{"\n"}
                          <span className="cmd-prompt">$ </span>npm run desktop:linux-arm64
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Kernel Telemetry & sysfs */}
            {activeTab === "telemetry" && (
              <div className="tab-pane-content">
                <div className="sysfs-specs-card p-3 mb-3">
                  <h6 className="fw-bold mb-2">
                    <FiCpu className="me-2 text-primary" />
                    How {productName} queries Ubuntu Host Hardware
                  </h6>
                  <p className="small text-muted mb-3">
                    Unlike standard web browsers that estimate CPU cores, {productName}{" "}
                    runs on an Electron IPC bridge and inspects native Linux kernel interfaces:
                  </p>

                  <ul className="sysfs-endpoint-list list-unstyled mb-0 small">
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <strong>Per-Core CPU Clock Speeds:</strong> reads from{" "}
                        <code>/sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq</code>
                      </div>
                    </li>
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <strong>Memory Layout & DIMM Slots:</strong> inspects DMI table
                        entries via <code>dmidecode</code> and <code>/sys/devices/virtual/dmi/id</code>
                      </div>
                    </li>
                    <li className="d-flex align-items-start gap-2 mb-2">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <strong>Real-Time 1-Second Telemetry Loop:</strong> React polls
                        the secure <code>window.deviceHardware.getSnapshot()</code> bridge every 1000ms.
                      </div>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <FiCheckCircle className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <strong>Zero Root Requirement:</strong> All standard CPU frequency,
                        memory usage, and baseboard queries run without <code>sudo</code>.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UbuntuDownloadCenter;
