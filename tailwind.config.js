/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      // primary
      cathayJade: '#005d63',

      // secondary
      mediumJade: '#387d79',
      lightJade: '#6fa088',
      grey: '#808295',
      slate: '#bcbec0',
      lightSlate: '#e6e7e8',
      sand: '#dad2bc',
      darkSand: '#877a5c',
      lightSand: '#dad2bc',

      // tertiary
      cathaySaffron: '#c2262e',

      // lifestyle
      holidays: '#7aabad',
      wellness: '#93b3c8',
      payment: '#c2e3de',
      shopping: '#b48371',
      member: '#bfad88',
      dining: 'd3a079',

      // cabin class
      economy: '#275c62',
      premiumEconomy: '#4c86a0',
      business: '#1b3668',
      firstClass: '#822c42',
    },
    screens: {
      'small': '500px',
      'large': '1440px',
    },
    extend: {
      fontFamily: {
        'walsheim': ['Walsheim'],
      },
    },
    plugins: [],
  }
}
