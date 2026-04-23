/**
 * Utility to generate consistent but daily-rotating pastel colors for services.
 */

const PASTEL_PALETTE = [
  { bg: "bg-blue-100", border: "border-blue-200", text: "text-blue-800", shadow: "shadow-blue-100" },
  { bg: "bg-emerald-100", border: "border-emerald-200", text: "text-emerald-800", shadow: "shadow-emerald-100" },
  { bg: "bg-violet-100", border: "border-violet-200", text: "text-violet-800", shadow: "shadow-violet-100" },
  { bg: "bg-amber-100", border: "border-amber-200", text: "text-amber-800", shadow: "shadow-amber-100" },
  { bg: "bg-rose-100", border: "border-rose-200", text: "text-rose-800", shadow: "shadow-rose-100" },
  { bg: "bg-cyan-100", border: "border-cyan-200", text: "text-cyan-800", shadow: "shadow-cyan-100" },
  { bg: "bg-orange-100", border: "border-orange-200", text: "text-orange-800", shadow: "shadow-orange-100" },
  { bg: "bg-indigo-100", border: "border-indigo-200", text: "text-indigo-800", shadow: "shadow-indigo-100" },
];

/**
 * Generates a simple hash for a string
 */
const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

/**
 * Returns a color object based on service name and date salt
 */
export const getServiceColor = (serviceName: string, dateStr: string) => {
  // Use service name + date as salt to rotate palette daily
  const salt = `${serviceName}-${dateStr}`;
  const index = hashCode(salt) % PASTEL_PALETTE.length;
  return PASTEL_PALETTE[index];
};
