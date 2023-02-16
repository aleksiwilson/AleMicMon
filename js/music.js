
var musicPlayer = document.getElementById('music-player')
var musicPlayerTimer
 
function playMusic(obj) {
  var musicPlayUrl = musicPlayer.src
  var thisKey = $(obj).data('key')
  clearInterval(musicPlayerTimer)

  $('.music-play').removeClass('current')
   
  if(musicPlayUrl == thisKey){
    //stop playing music
    if(musicPlayer.paused){
      $(obj).parent().parent().addClass('current')
      musicPlayer.play()
      musicPlayerTimer = setInterval(musicPlayProgress,1000)
    }else{
      musicPlayer.pause()
    }
  }else{
    //Change music playback
    musicPlayer.src = thisKey
    musicPlayer.play()
    $(obj).parent().parent().addClass('current')
    $('#musicplayer-bar-container,#musicplayer-volume-container,#music-play-time').remove()
    var thisCon = $(obj).parent().parent()
    var musicPlayerBarHtml = `<div class="progress" id="musicplayer-bar-container">
                          <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 0%;" id="music-player-bar">
                          </div>
                      </div>`
    var musicPlayerVolumeHtml = `<div id="musicplayer-volume-container">
                      <div id="musicplayer-volume-bar-container">
                        <div id="musicplayer-volume-bar"></div>
                      </div>
                      <div class="fa fa-volume-up">
                        <a href="javascript:;" onclick="muteSetting(this)"></a>
                      </div>
                    </div>`                     
    thisCon.append(musicPlayerBarHtml,musicPlayerVolumeHtml)
    $(obj).parent().parent().find('.music-length').append('<span id="music-play-time"></span>')
    musicPlayerTimer = setInterval(musicPlayProgress,1000)
  }
 
  // control progress bar
  $('#musicplayer-bar-container').bind('click',function(e){
    var leftDistance = e.offsetX
    var clickProgress = (leftDistance / $(this).width())
    musicPlayer.currentTime = musicPlayer.duration * clickProgress
    $('#music-player-bar').css('width',clickProgress * 100 + '%')
  })
 
  // control volume
  $('#musicplayer-volume-bar-container').bind('click',function(e){
    var topDistance = e.offsetY
    var clickProgress = (topDistance / $(this).height())
    musicVolume = 1 - clickProgress
    musicPlayer.volume = musicVolume
    $('#musicplayer-volume-bar').css('height', clickProgress * 100 + '%')
    if(musicVolume > 0){
      musicPlayer.muted = false
      $('.musicplayer-volume-icon').find('i').html('mute')
      $('.musicplayer-volume-icon').removeClass('mute')
    }
  })
}
 
// Detect playback progress
function musicPlayProgress(){
    var musicTotalLength = musicPlayer.duration
    var musicCurrentLength = musicPlayer.currentTime
    var musicProgress = (musicCurrentLength / musicTotalLength) * 100 + '%'
    $('#music-play-time').html(timeConversion(musicCurrentLength) + ' / ' + timeConversion(musicTotalLength))
    $('#music-player-bar').css('width',musicProgress)
    if(musicPlayer.ended){
      // Check for paused state
      $('.music-play').removeClass('current')
    }
    if(musicPlayer.error != null){
      // Check for playback errors
      clearInterval(musicPlayerTimer)
      $('.music-play').removeClass('current')
      alert('playback errors！')
    }
}
 
// mute setting
function muteSetting(obj){
  var isHasMute = $(obj).parent().hasClass('mute')
  if(isHasMute){
    // turn on sound
    musicPlayer.muted = false
    musicPlayer.volume = 1
    $(obj).find('i').html('mute')
    $(obj).parent().removeClass('mute')
    $('#musicplayer-volume-bar').css('height','0%')
  }else{
    // set mute
    musicPlayer.muted = true
    $(obj).find('i').html('mute')
    $(obj).parent().addClass('mute')
    $('#musicplayer-volume-bar').css('height','100%')
  }
}
 
// time format conversion
function timeConversion(time){
  var seconds = parseInt(time)   // Second
  var minutes = 0                // Minute
  var hours = 0                  // Hour
  if(seconds > 60) {
      minutes = parseInt(seconds/60);
      seconds = parseInt(seconds%60);
      if(minutes > 60) {
          hours = parseInt(minutes/60);
          minutes = parseInt(minutes%60);
      }
  }
  var result = ''
  if(seconds < 10)
    seconds = '0' + seconds
  if(minutes < 10)
    minutes = '0' + minutes
  if(hours > 0) {
    if(hours < 10)
      hours = '0' + hours
    result = hours + ':' + minutes + ":" + seconds
  }else{
    result = minutes + ":" + seconds
  }
  return result
}
