/**
 * AuraLuxe Royal Navy & Deep Sapphire Theme System
 * 
 * Core Palette:
 * 1. #08063F - Deep Midnight Navy (Primary Base / Darkest Accent)
 * 2. #031256 - Imperial Navy (Secondary Core / Panel & Surface)
 * 3. #061F5F - Royal Sapphire Navy (Interactive Accent / Borders & Highlights)
 */

export const themeColors = {
  // Hex Values
  midnight: "#08063F",
  navy: "#031256",
  sapphire: "#061F5F",

  // Theme Image Assets
  authBgImage: "https://i.pinimg.com/1200x/b7/ac/b1/b7acb1619cb998eaaa985df91a72a7cf.jpg",

  // Tailwind Pre-composed Utility Strings
  input: {
    border: "border-[#061F5F] focus:border-[#031256] focus:ring-[#061F5F]",
    base: "border-[#061F5F]/80 focus:border-[#031256] focus:ring-2 focus:ring-[#061F5F]/40 outline-none transition-all duration-200",
  },

  button: {
    primary: "bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F] hover:from-[#061F5F] hover:via-[#031256] hover:to-[#08063F] text-white shadow-lg shadow-[#08063F]/30",
    outline: "border border-[#061F5F] text-[#061F5F] hover:bg-[#061F5F] hover:text-white transition-all",
  },

  card: {
    overlay: "bg-[#08063F]/85 backdrop-blur-xl border border-[#061F5F]/50 shadow-2xl",
    solid: "bg-[#031256] border border-[#061F5F]",
  },

  gradient: {
    brand: "bg-gradient-to-br from-[#08063F] via-[#031256] to-[#061F5F]",
    banner: "bg-gradient-to-r from-[#08063F] via-[#031256] to-[#061F5F]",
  },
};

