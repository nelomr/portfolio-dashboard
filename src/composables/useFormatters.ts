export function formatCurrency(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return '€0.00'
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numValue)) return '€0.00'
  
  const locale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : (import.meta.env.VITE_APP_LOCALE || 'en-US')
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue)
}

export function formatPercent(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return '0.00%'
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(numValue)) return '0.00%'
  
  // Intl.NumberFormat with style: 'percent' automatically multiplies by 100.
  // Wait, if the input is already a percentage like 5.5 (meaning 5.5%),
  // passing it directly to Intl percent formatter as 5.5 will result in 550%.
  // Typically, ROI is passed as a percentage value (e.g. 5.5).
  // So we divide by 100 before formatting.
  const locale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : (import.meta.env.VITE_APP_LOCALE || 'en-US')
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue / 100)
}
