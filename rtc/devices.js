/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

//audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);
   // const videoElement = document.querySelector('video');
    const audioInputSelect = document.querySelector('select#audioSource');
    //const audioOutputSelect = document.querySelector('select#audioOutput');
    const videoSelect = document.querySelector('select#videoSource');
    const selectors = [audioInputSelect, videoSelect];
    
 //   audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);
          
    function gotDevices(deviceInfos) {
      // Handles being called several times to update labels. Preserve values.
      const values = selectors.map(select => select.value);
      selectors.forEach(select => {
        while (select.firstChild) {
          select.removeChild(select.firstChild);
        }
      });
      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      
            if(option.text == 'Default - Microphone (Audio_Device) (093a:2700)'){
              option.text = "Default - Microphone (Audio_Device) (093a:2700)";
              option.innerHTML = "Default - Microphone";
            }
            if(option.text == 'Communications - Microphone (Audio_Device) (093a:2700)'){
              option.text = "Communications - Microphone (Audio_Device) (093a:2700)";
              option.innerHTML = "Communications - Microphone";
            }
            if(option.text == 'Microphone (Realtek High Definition Audio)'){
              option.text = "Microphone (Realtek High Definition Audio)";
              option.innerHTML = "Realtek High Definition Audio";
            }

          audioInputSelect.appendChild(option);
/*         } else if (deviceInfo.kind === 'audiooutput') {
          option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
          audioOutputSelect.appendChild(option); */
        } else if (deviceInfo.kind === 'videoinput') {
          option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
          if(option.text == 'PC Cam (090c:037c)'){
            option.text = "PC Cam (090c:037c)";
            option.innerHTML = "CAM 1";
          }
          if(option.text == 'USB2.0_Camera (093a:2700)'){
            option.text = "USB2.0_Camera (093a:2700)";
            option.innerHTML = "CAM 2";        
          }
          videoSelect.appendChild(option);
        } else {
          console.log('Some other kind of source/device: ', deviceInfo);
        }
      }
      selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
          select.value = values[selectorIndex];
        }
      });
    }


  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
      .then(() => {
        console.log(`Success, audio output device attached: ${sinkId}`);
      })
      .catch(error => {
        let errorMessage = error;
        if (error.name === 'SecurityError') {
          errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
        }
        console.error(errorMessage);
        // Jump back to first output device in the list as it's the default.
       // audioOutputSelect.selectedIndex = 0;
      });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

/* function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(videoElement, audioDestination);
} */

function gotStream(stream,videoId) {
   console.log('videoId',videoId)
  var videoElement = document.getElementById(videoId);
  //window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;

  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

function startStream(videoId) {
/*   if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  } */
  const audioSource = audioInputSelect.value;
  const videoSource = videoSelect.value;

  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).then(e => gotStream(e,videoId)).then(gotDevices).catch(handleError);
}

//audioInputSelect.onchange = start;
//audioOutputSelect.onchange = changeAudioDestination;

//videoSelect.onchange = start;

//start();