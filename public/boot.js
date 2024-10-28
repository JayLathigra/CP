define([], function () {
  'use strict'
  // #####################################################
  // Settings
  //
  var port = 8801
  // TODO: re-enable
  var path = '/2024/cathay-pacific/'
  //
  // #####################################################

  // #####################################################
  // No need to touch
  //
  var env =
    window.location.hostname === 'localhost' ||
      window.location.hostname.indexOf('192.168') > -1 ||
      window.location.hostname.indexOf('0.0.0.0') > -1
      ? 'dev'
      : 'prod'

  var root = {
    dev: 'http://localhost:' + port + '/',
    prod: 'https://labs.theguardian.com' + path
    // prod: 'http://wf-guardian.s3-website-us-west-2.amazonaws.com' + path
  }

  // Get paths for assets (css + js)
  // var rootPath = '{{rootPath}}'
  var rootPath = root[env]

  function addCSS(url) {
    var head = document.querySelector('head')
    var link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    head.appendChild(link)
  }

  return {
    boot: function (el, context, config, mediator) {
      // console.log('rootPath', rootPath)

      // Load CSS
      addCSS(rootPath + 'scripts/main.css')

      // Load main application
      require([rootPath + 'scripts/main.js'], function (main) {
        // console.log(main)
        main.init(el, rootPath)

        // Main app returns a almond instance of require to avoid
        // R2 / NGW inconsistencies.
        // require(['default'], function (main) {
        //   console.log(main)
        //   main.init(el, rootPath)
        // })
      }, function (err) {
        console.error('Error loading boot.', err)
      })
    }
  }
})
