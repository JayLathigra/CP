module.exports = function (api) {
  const isTest = api.env('test')

  api.cache(true)

  const presets = [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          browsers: [
            '>1.5%',
            'not ie <12',
            'not iOS <10',
            'not Android <6',
            'not Opera <1000',
            'not Samsung <1000',
            'not Baidu <1000',
            'not ExplorerMobile <1000',
            'not OperaMobile <1000',
            'not OperaMini all',
            'not dead'
          ]
        }
      }
    ]
  ]
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ]

  return {
    compact: false,
    presets,
    plugins
  }
}
