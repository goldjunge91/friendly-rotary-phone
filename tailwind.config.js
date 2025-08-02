tailwind.config = {
  theme: {
    extend: {
      colors: {
        'curious-blue': {
          '50': 'oklch(97.63% 0.01 247.91deg)',
          '100': 'oklch(95.17% 0.02 243.4deg)',
          '200': 'oklch(90.13% 0.05 242.5deg)',
          '300': 'oklch(82.78% 0.09 242.38deg)',
          '400': 'oklch(74.55% 0.13 243.16deg)',
          '500': 'oklch(65.31% 0.13 242.68deg)',
          '600': 'oklch(58.88% 0.13 242.44deg)',
          '700': 'oklch(50.01% 0.11 242.51deg)',
          '800': 'oklch(44.27% 0.09 242.95deg)',
          '900': 'oklch(39.07% 0.07 243deg)',
          '950': 'oklch(29.37% 0.05 242.7deg)',
        },
        'brandy-punch': {
          '50': 'oklch(98.18% 0.02 77.06deg)',
          '100': 'oklch(95.44% 0.04 74.06deg)',
          '200': 'oklch(90.56% 0.08 74.19deg)',
          '300': 'oklch(85.83% 0.11 71.28deg)',
          '400': 'oklch(81.93% 0.14 66.16deg)',
          '500': 'oklch(76.96% 0.14 62.7deg)',
          '600': 'oklch(65.3% 0.13 62.68deg)',
          '700': 'oklch(55.45% 0.12 62.22deg)',
          '800': 'oklch(47.38% 0.11 62.9deg)',
          '900': 'oklch(41.54% 0.08 62.71deg)',
          '950': 'oklch(27.91% 0.06 63.71deg)',
        },
        'dove-gray': {
          '50': 'oklch(98.51% 0 none)',
          '100': 'oklch(97.02% 0 none)',
          '200': 'oklch(92.19% 0 none)',
          '300': 'oklch(86.99% 0 none)',
          '400': 'oklch(70.9% 0 none)',
          '500': 'oklch(55.55% 0 none)',
          '600': 'oklch(43.86% 0 none)',
          '700': 'oklch(37.15% 0 none)',
          '800': 'oklch(26.86% 0 none)',
          '900': 'oklch(20.46% 0 none)',
          '950': 'oklch(14.48% 0 none)',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
      }
    }
  }
}
