/**
 * GitHub API & Repository Fetching Service
 * Fetches releases, package metadata, README installation instructions, and commits
 * for DEEP_HARDWARE_SEEKER and other products from GitHub.
 */

// Fallback metadata in case GitHub API rate limit (60 req/hr) is hit or offline
export const FALLBACK_GITHUB_DATA = {
  owner: "Srikanthy12866",
  repo: "DEEP_HARDWARE_SEEKER",
  repoUrl: "https://github.com/Srikanthy12866/DEEP_HARDWARE_SEEKER",
  branch: "main",
  productName: "Fieldnote Device Report",
  version: "0.1.0",
  description: "Deep Hardware Diagnostic & Real-Time Host Telemetry Suite for Ubuntu / Linux",
  linuxTargets: ["AppImage", "deb"],
  artifactTemplate: "${productName}-${version}-${arch}.${ext}",
  scripts: {
    desktop: "concurrently -k -n ui,desktop \"cross-env BROWSER=none react-scripts start\" \"wait-on http://localhost:3000 && cross-env ELECTRON_START_URL=http://localhost:3000 electron .\"",
    "desktop:build": "npm run build && electron-builder",
    "desktop:linux-arm64": "npm run build && electron-builder --linux AppImage deb --arm64",
  },
  dependencies: {
    systeminformation: "^5.33.15",
    electron: "^44.5.1",
    "electron-builder": "^26.15.3",
    react: "^19.3.0",
  },
  latestCommit: {
    sha: "1cad873",
    fullSha: "1cad873994519967261908b8b939c3e4c4eb985c",
    message: "final product",
    author: "Srikanthy12866",
    date: "2026-10-05T09:04:23Z",
  },
  releases: [],
  isCached: true,
};

/**
 * Parses GitHub owner and repo name from URL
 */
export const parseGithubRepo = (url) => {
  if (!url) return { owner: "Srikanthy12866", repo: "DEEP_HARDWARE_SEEKER" };
  try {
    const cleanUrl = url.replace(/\/$/, "");
    const parts = cleanUrl.split("/");
    const repo = parts.pop()?.replace(/\.git$/, "") || "DEEP_HARDWARE_SEEKER";
    const owner = parts.pop() || "Srikanthy12866";
    return { owner, repo };
  } catch {
    return { owner: "Srikanthy12866", repo: "DEEP_HARDWARE_SEEKER" };
  }
};

/**
 * Format bytes into human-readable string (e.g. 84.5 MB)
 */
export const formatBytes = (bytes, decimals = 1) => {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Convert ISO date to human relative time (e.g. 2 days ago)
 */
export const timeAgo = (dateInput) => {
  if (!dateInput) return "recently";
  try {
    const date = new Date(dateInput);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
  } catch {
    return "recently";
  }
};

// In-memory cache to prevent repeated API calls
const githubCache = new Map();

/**
 * Fetches all relevant details for a GitHub repository:
 * - Releases and assets (.deb, .AppImage)
 * - package.json (product name, version, electron-builder linux targets)
 * - README.md (instructions)
 * - Latest commit & repository info
 */
export const fetchGithubRepoDetails = async (repoUrl) => {
  const { owner, repo } = parseGithubRepo(repoUrl);
  const cacheKey = `${owner}/${repo}`;

  if (githubCache.has(cacheKey)) {
    const cached = githubCache.get(cacheKey);
    // Cache for 5 minutes
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.data;
    }
  }

  const result = {
    owner,
    repo,
    repoUrl: `https://github.com/${owner}/${repo}`,
    branch: "main",
    productName: "Fieldnote Device Report",
    version: "0.1.0",
    description: "Deep Hardware Diagnostic & Real-Time Host Telemetry Suite for Ubuntu / Linux",
    linuxTargets: ["AppImage", "deb"],
    artifactTemplate: "${productName}-${version}-${arch}.${ext}",
    scripts: { ...FALLBACK_GITHUB_DATA.scripts },
    dependencies: { ...FALLBACK_GITHUB_DATA.dependencies },
    latestCommit: { ...FALLBACK_GITHUB_DATA.latestCommit },
    releases: [],
    availableFiles: [],
    readmeContent: "",
    fetchedAt: new Date().toISOString(),
    isLive: false,
    rateLimited: false,
  };

  try {
    // 1. Fetch package.json from raw.githubusercontent.com (No API rate limit!)
    const packageJsonUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/package.json`;
    try {
      const pkgRes = await fetch(packageJsonUrl);
      if (pkgRes.ok) {
        const pkg = await pkgRes.json();
        if (pkg.name) result.packageName = pkg.name;
        if (pkg.version) result.version = pkg.version;
        if (pkg.build?.productName) result.productName = pkg.build.productName;
        else if (pkg.name) result.productName = pkg.name;

        if (pkg.build?.linux?.target) {
          result.linuxTargets = pkg.build.linux.target;
        }
        if (pkg.build?.linux?.artifactName) {
          result.artifactTemplate = pkg.build.linux.artifactName;
        }
        if (pkg.scripts) {
          result.scripts = { ...result.scripts, ...pkg.scripts };
        }
        if (pkg.dependencies) {
          result.dependencies = { ...result.dependencies, ...pkg.dependencies };
        }
        result.isLive = true;
      }
    } catch (e) {
      console.warn("Could not fetch raw package.json from GitHub:", e);
    }

    // 2. Fetch README.md from raw.githubusercontent.com
    const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
    try {
      const readmeRes = await fetch(readmeUrl);
      if (readmeRes.ok) {
        result.readmeContent = await readmeRes.text();
        result.isLive = true;
      }
    } catch (e) {
      console.warn("Could not fetch raw README.md from GitHub:", e);
    }

    // 3. Fetch Releases from GitHub REST API
    const releasesApiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
    try {
      const relRes = await fetch(releasesApiUrl, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (relRes.ok) {
        result.releases = await relRes.json();
        result.isLive = true;
      } else if (relRes.status === 403) {
        result.rateLimited = true;
      }
    } catch (e) {
      console.warn("Could not fetch GitHub releases:", e);
    }

    // 4. Fetch Latest Commit from GitHub REST API
    const commitsApiUrl = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`;
    try {
      const commitRes = await fetch(commitsApiUrl, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (commitRes.ok) {
        const commits = await commitRes.json();
        if (Array.isArray(commits) && commits.length > 0) {
          const c = commits[0];
          result.latestCommit = {
            sha: c.sha.substring(0, 7),
            fullSha: c.sha,
            message: c.commit?.message?.split("\n")[0] || "Update repository",
            author: c.commit?.author?.name || c.author?.login || owner,
            date: c.commit?.author?.date || new Date().toISOString(),
          };
          result.isLive = true;
        }
      }
    } catch (e) {
      console.warn("Could not fetch GitHub commits:", e);
    }

    // 5. Build Available Files List (Deb file, APP files, Source archives)
    const files = [];
    const prodSlug = result.productName.replace(/\s+/g, "-");
    const v = result.version || "0.1.0";

    // Check if there are real release assets in GitHub releases
    let debAsset = null;
    let appImageAsset = null;

    if (Array.isArray(result.releases) && result.releases.length > 0) {
      const latestRel = result.releases[0];
      if (Array.isArray(latestRel.assets)) {
        debAsset = latestRel.assets.find((a) => a.name.endsWith(".deb"));
        appImageAsset = latestRel.assets.find((a) => a.name.endsWith(".AppImage"));
      }
    }

    // A. DEB File (Native Ubuntu / Debian Package)
    const debFileName = debAsset?.name || `${prodSlug}-${v}-amd64.deb`;
    const debArm64FileName = `${prodSlug}-${v}-arm64.deb`;
    const debDownloadUrl =
      debAsset?.browser_download_url ||
      `https://github.com/${owner}/${repo}/releases/download/v${v}/${debFileName}`;

    files.push({
      id: "deb-x64",
      type: "deb",
      badge: "Ubuntu / Debian (.deb)",
      title: "Ubuntu Debian Package (x86_64 / amd64)",
      fileName: debFileName,
      arch: "x86_64 (amd64)",
      targetOS: "Ubuntu 24.04 / 22.04 / 20.04 LTS & Debian 11/12",
      size: debAsset ? formatBytes(debAsset.size) : "~85.2 MB",
      downloadUrl: debDownloadUrl,
      repoDownloadFallback: `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`,
      isDirectAsset: !!debAsset,
      description:
        "Native Ubuntu installation package. Registers system menu shortcut, desktop telemetry service, and sandboxed Electron kernel bridge.",
      installCmd: `sudo dpkg -i ${debFileName}`,
      fixCmd: `sudo apt-get install -f -y`,
      runCmd: `fieldnote-device-report`,
      arm64FileName: debArm64FileName,
      arm64DownloadUrl: `https://github.com/${owner}/${repo}/releases/download/v${v}/${debArm64FileName}`,
    });

    // B. AppImage File (Universal Linux Portable App)
    const appImageFileName = appImageAsset?.name || `${prodSlug}-${v}-x86_64.AppImage`;
    const appImageDownloadUrl =
      appImageAsset?.browser_download_url ||
      `https://github.com/${owner}/${repo}/releases/download/v${v}/${appImageFileName}`;

    files.push({
      id: "appimage",
      type: "appimage",
      badge: "Universal Linux (.AppImage)",
      title: "Standalone Portable Linux App (.AppImage)",
      fileName: appImageFileName,
      arch: "x86_64",
      targetOS: "Ubuntu (All LTS versions), Debian, Fedora, Arch Linux",
      size: appImageAsset ? formatBytes(appImageAsset.size) : "~92.4 MB",
      downloadUrl: appImageDownloadUrl,
      repoDownloadFallback: `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`,
      isDirectAsset: !!appImageAsset,
      description:
        "Self-contained standalone executable. Requires no root privileges or installation. Run anywhere directly from your downloads folder.",
      installCmd: `chmod +x ${appImageFileName} && ./${appImageFileName}`,
      runCmd: `./${appImageFileName}`,
      fuseNote: "Ubuntu 22.04+ may require: sudo apt install libfuse2 -y",
    });

    // C. Source Package Archive (.zip from GitHub)
    files.push({
      id: "source-zip",
      type: "source",
      badge: "GitHub Source Archive (.zip)",
      title: "Full Desktop Diagnostic Suite Source",
      fileName: `${repo}-main.zip`,
      arch: "Universal / All Platforms",
      targetOS: "Ubuntu 20.04+ / Linux / macOS / Windows",
      size: "~1.2 MB",
      downloadUrl: `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`,
      tarballUrl: `https://github.com/${owner}/${repo}/archive/refs/heads/main.tar.gz`,
      isDirectAsset: true,
      description:
        "Complete Electron + React diagnostic application source code fetched live from GitHub main branch. Includes IPC kernel bridges and build scripts.",
      cloneCmd: `git clone https://github.com/${owner}/${repo}.git`,
      buildCmd: `npm install && npm run desktop:build`,
    });

    result.availableFiles = files;

    // Cache the result
    githubCache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    return result;
  } catch (error) {
    console.error("Error fetching repository details from GitHub:", error);
    // Return fallback with available files
    const fallback = { ...FALLBACK_GITHUB_DATA };
    fallback.availableFiles = [
      {
        id: "deb-x64",
        type: "deb",
        badge: "Ubuntu / Debian (.deb)",
        title: "Ubuntu Debian Package (x86_64 / amd64)",
        fileName: "Fieldnote-Device-Report-0.1.0-amd64.deb",
        arch: "x86_64 (amd64)",
        targetOS: "Ubuntu 24.04 / 22.04 / 20.04 LTS & Debian 11/12",
        size: "~85.2 MB",
        downloadUrl: `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`,
        isDirectAsset: false,
        description:
          "Native Ubuntu installation package. Registers system menu shortcut, desktop telemetry service, and sandboxed Electron kernel bridge.",
        installCmd: `sudo dpkg -i Fieldnote-Device-Report-0.1.0-amd64.deb`,
        fixCmd: `sudo apt-get install -f -y`,
        runCmd: `fieldnote-device-report`,
      },
      {
        id: "appimage",
        type: "appimage",
        badge: "Universal Linux (.AppImage)",
        title: "Standalone Portable Linux App (.AppImage)",
        fileName: "Fieldnote-Device-Report-0.1.0-x86_64.AppImage",
        arch: "x86_64",
        targetOS: "Ubuntu (All LTS versions), Debian, Fedora, Arch Linux",
        size: "~92.4 MB",
        downloadUrl: `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`,
        isDirectAsset: false,
        description:
          "Self-contained standalone executable. Requires no root privileges or installation. Run anywhere directly from your downloads folder.",
        installCmd: `chmod +x Fieldnote-Device-Report-0.1.0-x86_64.AppImage && ./Fieldnote-Device-Report-0.1.0-x86_64.AppImage`,
        runCmd: `./Fieldnote-Device-Report-0.1.0-x86_64.AppImage`,
      },
      {
        id: "source-zip",
        type: "source",
        badge: "GitHub Source Archive (.zip)",
        title: "Full Desktop Diagnostic Suite Source",
        fileName: `${repo}-main.zip`,
        arch: "Universal / All Platforms",
        targetOS: "Ubuntu 20.04+ / Linux / macOS / Windows",
        size: "~1.2 MB",
        downloadUrl: `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`,
        isDirectAsset: true,
        description:
          "Complete Electron + React diagnostic application source code fetched live from GitHub main branch.",
        cloneCmd: `git clone https://github.com/${owner}/${repo}.git`,
        buildCmd: `npm install && npm run desktop:build`,
      },
    ];
    return fallback;
  }
};
