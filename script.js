class BusinessThemeSwitcher {
  constructor() {
    this.toggle = document.getElementById("themeToggle")
    this.themeStatus = document.getElementById("themeStatus")
    this.hamburger = document.getElementById("hamburger")

    this.init()
  }

  init() {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem("business-theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    let initialTheme
    if (savedTheme) {
      initialTheme = savedTheme
    } else {
      initialTheme = systemPrefersDark ? "dark" : "light"
    }

    this.setTheme(initialTheme)
    this.bindEvents()
    this.initNavigation()

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("business-theme")) {
        this.setTheme(e.matches ? "dark" : "light")
      }
    })
  }

  bindEvents() {
    // Theme toggle events
    this.toggle.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Keyboard accessibility for theme toggle
    this.toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.toggleTheme()
      }
    })

    // Make toggle focusable
    this.toggle.setAttribute("tabindex", "0")
    this.toggle.setAttribute("role", "switch")
    this.toggle.setAttribute("aria-label", "Toggle dark/light theme")

    // Form submission
    const contactForm = document.querySelector(".contact-form form")
    if (contactForm) {
      contactForm.addEventListener("submit", this.handleFormSubmit.bind(this))
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          const offsetTop = target.offsetTop - 70 // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  initNavigation() {
    // Mobile menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener("click", () => {
        // This would toggle mobile menu - simplified for demo
        console.log("Mobile menu toggle")
      })
    }

    // Navbar scroll effect
    let lastScrollTop = 0
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)"
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    })
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    this.setTheme(newTheme)
  }

  setTheme(theme) {
    // Update DOM
    document.documentElement.setAttribute("data-theme", theme)

    // Update toggle switch
    if (theme === "dark") {
      this.toggle.classList.add("active")
      this.themeStatus.textContent = "🌙 Dark Mode"
      this.toggle.setAttribute("aria-checked", "true")
    } else {
      this.toggle.classList.remove("active")
      this.themeStatus.textContent = "☀️ Light Mode"
      this.toggle.setAttribute("aria-checked", "false")
    }

    // Save to localStorage with business-specific key
    localStorage.setItem("business-theme", theme)

    // Dispatch custom event for analytics or other integrations
    window.dispatchEvent(
      new CustomEvent("businessThemeChange", {
        detail: {
          theme,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        },
      }),
    )

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme)
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector("meta[name=theme-color]")
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.name = "theme-color"
      document.getElementsByTagName("head")[0].appendChild(metaThemeColor)
    }

    metaThemeColor.content = theme === "dark" ? "#0f172a" : "#ffffff"
  }

  handleFormSubmit(e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    // Simulate form submission
    console.log("Form submitted:", data)

    // Show success message (in a real app, this would be handled properly)
    const submitButton = e.target.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      submitButton.textContent = "Message Sent!"
      setTimeout(() => {
        submitButton.textContent = originalText
        submitButton.disabled = false
        e.target.reset()
      }, 2000)
    }, 1000)
  }

  getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light"
  }

  // Business-specific analytics integration
  trackThemeUsage() {
    const theme = this.getCurrentTheme()
    const usage = JSON.parse(localStorage.getItem("theme-usage") || "{}")

    usage[theme] = (usage[theme] || 0) + 1
    usage.lastChanged = new Date().toISOString()

    localStorage.setItem("theme-usage", JSON.stringify(usage))
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.businessTheme = new BusinessThemeSwitcher()
})

// Business theme change event listener for analytics
window.addEventListener("businessThemeChange", (e) => {
  console.log(`Business theme changed to: ${e.detail.theme}`)

  // Here you could integrate with analytics services
  // gtag('event', 'theme_change', { theme: e.detail.theme })
  // analytics.track('Theme Changed', { theme: e.detail.theme })
})

// Utility functions for external integrations
window.businessThemeUtils = {
  setTheme: (theme) => {
    if (window.businessTheme) {
      window.businessTheme.setTheme(theme)
    }
  },
  getCurrentTheme: () => {
    return window.businessTheme ? window.businessTheme.getCurrentTheme() : "light"
  },
  toggleTheme: () => {
    if (window.businessTheme) {
      window.businessTheme.toggleTheme()
    }
  },
  getThemeUsage: () => {
    return JSON.parse(localStorage.getItem("theme-usage") || "{}")
  },
}

// Performance optimization: Preload theme-specific resources
function preloadThemeResources(theme) {
  // This could preload theme-specific images, fonts, etc.
  console.log(`Preloading resources for ${theme} theme`)
}

// Accessibility: Respect user's motion preferences
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty("--transition-duration", "0s")
}
