
$(function() {

  var sizer = $('#sizer')

  function changer(fn) {
    var old = {}
    return function(value) {
      if (value != old) {
        old = value
        fn(value)
      }
    }
  }

  var bounce = (function() {

    var z = -600
    var zz = -600
    var set = changer(function(value) {
      sizer.css('transform', value)
           .css('-webkit-transform', value)
    })

    setInterval(function() {
      z /= 1.5
      zz += (z - zz) / 2
      set('translateZ(' + Math.round(zz) + 'px)')
    }, 1000 / 60)

    return function() {
      z = -300
    }

  })()

  var beat = (function() {
    var record = []
    function bpm() {
      if (record.length <= 4) {
        return null
      }
      var sum = 0
      var count = 0
      for (var i = 0; i < record.length; i ++) {
        for (var j = i + 1; j < record.length; j ++) {
          var weight = j - i
          var value = (record[j] - record[i]) / (j - i)
          sum += value * weight
          count += weight
        }
      }
      return (60000 / (sum / count))
    }
    return function(t) {
      record.push(t || new Date().getTime())
      return bpm()
    }
  })()

  var text = changer(function(text) {
    $('#text').text(text)
  })

  function tap(t) {
    var bpm = beat(t)
    bounce()
    text(bpm == null ? 'TAP' : Math.round(bpm) + '')
  }

  $('#sizer').on('mousedown', function() {
    tap()
  })

  $(document).on('keydown', function(e) {
    if (e.which == 32 || e.which == 13) {
      tap()
    }
  })

  window.tap = tap

})


