const gulp = require('gulp')
const settings = require('./settings.js')
const { series, task, src } = gulp

// A credentials file must be installed (see README)
const s3 = require('gulp-s3-upload')({ useIAM: true })

const options = {
  env: 'build'
}

function deploy (cb) {
  if (!settings.s3.enable) {
    console.log('Gulp S3 task is disabled: see settings.js')
    return
  }

  if (!settings.s3.Bucket || !settings.s3.path) {
    console.log(
      'Gulp S3 task configuration error: see settings.js and README.md'
    )
    return
  }

  src('./public/**').pipe(
    s3({
      Bucket: settings.s3.Bucket,
      ACL: 'private',
      CacheControl: 'max-age=10',
      keyTransform: function (relativeFilename) {
        return settings.s3.path + relativeFilename
      }
    })
  )

  cb()
}

exports.deploy = deploy
