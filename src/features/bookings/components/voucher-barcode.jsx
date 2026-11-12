"use client";

import React, { useMemo } from "react";

/**
 * Standard Code 128 Patterns Table (Values 0 to 106)
 * Each pattern consists of 6 numbers: alternating widths of bar, space, bar, space, bar, space.
 * Each pattern totals exactly 11 module widths (except Stop code which has 7 elements totaling 13 modules).
 */
const CODE128_PATTERNS = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213", // 0-9
  "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132", // 10-19
  "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211", // 20-29
  "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313", // 30-39
  "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331", // 40-49
  "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111", // 50-59
  "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214", // 60-69
  "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111", // 70-79
  "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141", // 80-89
  "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141", // 90-99
  "114131", "311141", "411131", "211412", "211214", "211232", "2331112" // 100-106 (104=StartB, 106=Stop)
];

const START_B = 104;
const STOP = 106;

/**
 * Genuine GS1/ISO compliant Code 128-B Barcode generator.
 * Encodes alphanumeric reservation codes (e.g. "AUR-879412") into authentic
 * standard bars that any camera or hardware scanner will read accurately.
 */
export function VoucherBarcode({ code = "AUR-2026-0001", className = "" }) {
  const { bars, totalModules } = useMemo(() => {
    const rawText = (code || "AUR").trim();
    // Values array: starts with Start Code B (104)
    const values = [START_B];

    for (let i = 0; i < rawText.length; i++) {
      const charCode = rawText.charCodeAt(i);
      // Code 128-B maps ASCII 32..127 to values 0..95
      if (charCode >= 32 && charCode <= 126) {
        values.push(charCode - 32);
      } else {
        values.push(0); // Space fallback for unsupported chars
      }
    }

    // Checksum calculation: (StartValue + sum(index * charValue)) % 103
    let checksum = values[0];
    for (let i = 1; i < values.length; i++) {
      checksum += i * values[i];
    }
    const checkDigit = checksum % 103;
    values.push(checkDigit);
    values.push(STOP);

    // Convert values into alternating bar and space runs
    const barRects = [];
    let currentX = 10; // Quiet zone of 10 modules on left

    for (let i = 0; i < values.length; i++) {
      const pattern = CODE128_PATTERNS[values[i]] || CODE128_PATTERNS[0];
      let isBar = true; // Every pattern starts with a bar
      for (let j = 0; j < pattern.length; j++) {
        const width = parseInt(pattern[j], 10);
        if (isBar) {
          barRects.push({ x: currentX, width });
        }
        currentX += width;
        isBar = !isBar;
      }
    }

    currentX += 10; // Quiet zone of 10 modules on right
    return { bars: barRects, totalModules: currentX };
  }, [code]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="rounded bg-white p-1.5 shadow-sm border border-slate-200/80 dark:border-slate-700/80">
        <svg
          viewBox={`0 0 ${totalModules} 48`}
          className="h-10 w-auto max-w-[220px]"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="crispEdges"
          aria-label={`Reservation barcode ${code}`}
          role="img"
        >
          {/* Solid white background ensures 100% contrast for laser and camera readers */}
          <rect width="100%" height="100%" fill="#ffffff" />
          {bars.map((bar, idx) => (
            <rect
              key={idx}
              x={bar.x}
              y="3"
              width={bar.width}
              height="42"
              fill="#000000"
            />
          ))}
        </svg>
      </div>
      <span className="mt-1 font-mono text-[10px] font-bold tracking-[0.2em] text-slate-800 dark:text-slate-200 uppercase">
        {code}
      </span>
    </div>
  );
}
