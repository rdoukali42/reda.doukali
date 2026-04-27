/**
 * Centralized configuration for all external links and URLs
 * Update your links here and they'll be reflected throughout the portfolio
 */

export const socialLinks = {
  github: "https://github.com/rdoukali42",
  linkedin: "https://www.linkedin.com/in/rdoukali42/",
  email: "mailto:reda.doukali.farji@gmail.com", // Update with your actual email
  twitter: "https://twitter.com/yourusername", // Optional: Add if you have Twitter
  instagram: "https://instagram.com/yourusername", // Optional: Add if you have Instagram
} as const;

export const projectLinks = {
  sports42: "https://github.com/rdoukali42/42sports",
  mlops: "https://github.com/rdoukali42/Mlops_Level3_chanlenge",
  lyraixGuard: "https://huggingface.co/Lyraix-AI/LyraixGuard-v0",
  lyraixGuardPaper: "https://zenodo.org/records/19827438",
  securityBenchmark: "https://github.com/rdoukali42/level3.sevEval",
  goWebService: "https://github.com/rdoukali42/STACKIT_Challenge",
  aiMultiAgent: "https://github.com/rdoukali42/Network_LLMs",
} as const;

export const companyLinks = {
  arkadia: "https://www.arkadia-heilbronn.de/", // Update with actual URL
  alephAlpha: "https://aleph-alpha.com/",
  stackit: "https://www.stackit.de/",
  heilbronn42: "https://www.42heilbronn.de/en/",
} as const;

export const resumeLink = {
  // Add your resume/CV link here
  download: "/path/to/your/resume.pdf", // Update with actual path or URL
} as const;

// Color scheme for easy reference
export const brandColors = {
  primary: "#FFC107", // Gold
  background: "#121212", // Dark background
  primaryHSL: "45 100% 51%",
  backgroundHSL: "0 0% 7%",
} as const;
