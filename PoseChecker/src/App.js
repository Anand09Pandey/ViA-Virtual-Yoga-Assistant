// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

import React, { useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { abs } from "@tensorflow/tfjs";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // var pose;

  //  Load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: { width: 560, height: 420},
      multiplier: 1.0,
      scale: 1.0,
      quantBytes: 4,
    });
    //
    setInterval(() => {
      detect(net);
    }, 2000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      const image = document.getElementById('girl');
      const imageWidth = 560;
      const imageHeight = 420;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const posev = await net.estimateSinglePose(video);
      const posei = await net.estimateSinglePose(image);
      console.log(posev);
      console.log(posei);

      //CALCULATIONS
      let lsi = ((posei.keypoints[5].position.y - posei.keypoints[7].position.y) / (posei.keypoints[5].position.x - posei.keypoints[7].position.x)).toFixed(2);
      let lsv = ((posev.keypoints[5].position.y - posev.keypoints[7].position.y) / (posev.keypoints[5].position.x - posev.keypoints[7].position.x)).toFixed(2);
      
      let lwi = ((posei.keypoints[7].position.y - posei.keypoints[9].position.y) / (posei.keypoints[7].position.x - posei.keypoints[9].position.x)).toFixed(2);
      let lwv = ((posev.keypoints[7].position.y - posev.keypoints[9].position.y) / (posev.keypoints[7].position.x - posev.keypoints[9].position.x)).toFixed(2);
      
      let rsi = ((posei.keypoints[6].position.y - posei.keypoints[8].position.y) / (posei.keypoints[6].position.x - posei.keypoints[8].position.x)).toFixed(2);
      let rsv = ((posev.keypoints[6].position.y - posev.keypoints[8].position.y) / (posev.keypoints[6].position.x - posev.keypoints[8].position.x)).toFixed(2);
     
      let rwi = ((posei.keypoints[8].position.y - posei.keypoints[10].position.y) / (posei.keypoints[8].position.x - posei.keypoints[10].position.x)).toFixed(2);
      let rwv = ((posev.keypoints[8].position.y - posev.keypoints[10].position.y) / (posev.keypoints[8].position.x - posev.keypoints[10].position.x)).toFixed(2);
  

      let lhi = ((posei.keypoints[11].position.y - posei.keypoints[13].position.y) / (posei.keypoints[11].position.x - posei.keypoints[13].position.x)).toFixed(2);
      let lhv = ((posev.keypoints[11].position.y - posev.keypoints[13].position.y) / (posev.keypoints[11].position.x - posev.keypoints[13].position.x)).toFixed(2);
      
      let lai = ((posei.keypoints[13].position.y - posei.keypoints[15].position.y) / (posei.keypoints[13].position.x - posei.keypoints[15].position.x)).toFixed(2);
      let lav = ((posev.keypoints[13].position.y - posev.keypoints[15].position.y) / (posev.keypoints[13].position.x - posev.keypoints[15].position.x)).toFixed(2);
      
      let rhi = ((posei.keypoints[12].position.y - posei.keypoints[14].position.y) / (posei.keypoints[12].position.x - posei.keypoints[14].position.x)).toFixed(2);
      let rhv = ((posev.keypoints[12].position.y - posev.keypoints[14].position.y) / (posev.keypoints[12].position.x - posev.keypoints[14].position.x)).toFixed(2);
      
      let rai = ((posei.keypoints[14].position.y - posei.keypoints[16].position.y) / (posei.keypoints[14].position.x - posei.keypoints[16].position.x)).toFixed(2);
      let rav = ((posev.keypoints[14].position.y - posev.keypoints[16].position.y) / (posev.keypoints[14].position.x - posev.keypoints[16].position.x)).toFixed(2);

      let output = {
        leftArm: 1,
        rightArm: 1,
        leftWrist: 1,
        rightWrist: 1,
        leftThigh: 1,
        rightThigh: 1,
        leftLeg: 1,
        rightLeg: 1
      }
      //LEFT ARM
      if (posei.keypoints[5].score < 0.7 || posev.keypoints[5].score < 0.3 ||
        posei.keypoints[7].score < 0.7 || posev.keypoints[7].score < 0.3 || Math.abs(lsi - lsv) < 5) output.leftArm = 1;
      else output.leftArm = 0;
      //LEFT FOREARM
      if (posei.keypoints[7].score < 0.7 || posev.keypoints[7].score < 0.3 ||
        posei.keypoints[9].score < 0.7 || posev.keypoints[9].score < 0.7 || Math.abs(lwi - lwv) < 10) output.leftWrist = 1;
      else output.leftWrist = 0;
      //RIGHT ARM
      if (posei.keypoints[6].score < 0.7 || posev.keypoints[6].score < 0.3 ||
        posei.keypoints[8].score < 0.7 || posev.keypoints[8].score < 0.3 || Math.abs(rsi - rsv) < 5) output.rightArm = 1;
      else output.rightArm = 0;
      //RIGHT FOREARM
      if (posei.keypoints[8].score < 0.7 || posev.keypoints[8].score < 0.3 ||
        posei.keypoints[10].score < 0.7 || posev.keypoints[10].score < 0.7 || Math.abs(rwi - rwv) < 10) output.rightWrist = 1;
      else output.rightWrist = 0;
      //LEFT THIGH
      if (posei.keypoints[11].score < 0.7 || posev.keypoints[11].score < 0.5 ||
        posei.keypoints[13].score < 0.7 || posev.keypoints[13].score < 0.5 || Math.abs(lhi - lhv) < 5) output.leftThigh = 1;
      else output.leftThigh = 0;
      //LEFT LEG
      if (posei.keypoints[13].score < 0.7 || posev.keypoints[13].score < 0.5 ||
        posei.keypoints[15].score < 0.7 || posev.keypoints[15].score < 0.7 || Math.abs(lai - lav) < 20) output.leftLeg = 1;
      else output.leftLeg = 0;
      //RIGHT THIGH
      if (posei.keypoints[12].score < 0.7 || posev.keypoints[12].score < 0.5 ||
        posei.keypoints[14].score < 0.7 || posev.keypoints[14].score < 0.5 || Math.abs(rhi - rhv) < 5) output.rightThigh = 1;
      else output.rightThigh = 0;
      //RIGHT LEG
      if (posei.keypoints[14].score < 0.7 || posev.keypoints[14].score < 0.5 ||
        posei.keypoints[16].score < 0.7 || posev.keypoints[16].score < 0.7 || Math.abs(rai - rav) < 20) output.rightLeg = 1;
      else output.rightLeg = 0;



      // let result;
      // if (Math.abs(lsi - lsv) < 50 && Math.abs(lwi - lwv) < 50 && Math.abs(rsi - rsv) < 50 && Math.abs(rwi - rwv) < 50 &&
      //   Math.abs(lhi - lhv) < 50 && Math.abs(lai - lav) < 50 && Math.abs(rhi - rhv) < 50 && Math.abs(rai - rav) < 50) result = 'Good';
      // else result = 'Bad';
      console.log(Math.abs(lsi - lsv));
      console.log(Math.abs(lwi - lwv));
      console.log(Math.abs(rsi - rsv));
      console.log(Math.abs(rwi - rwv));
      console.log(Math.abs(lhi - lhv));
      console.log(Math.abs(lai - lav));
      console.log(Math.abs(rhi - rhv));
      console.log(Math.abs(rai - rav));

      let flag = 0;
      if (posei.score < 0.5) flag = 1;
      else if (posev.score < 0.8) flag = 2;


      drawCanvas(posev, video, videoWidth, videoHeight, canvasRef);
      // drawCanvas(posei, image, imageWidth, imageHeight, canvasRef);
      displayText(output, flag);
    }
  };

  const displayText = (output, flag) => {
    console.log(output);
    let myNode = document.getElementById("list");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }

    let result=0;
    
    if (output.leftArm==0) {
      let li = document.createElement("li");
      li.innerHTML = "Left Arm";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.leftWrist==0) {
      let li = document.createElement("li");
      li.innerHTML = "Left Wrist";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.rightArm==0) {
      let li = document.createElement("li");
      li.innerHTML = "Right Arm";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.rightWrist==0) {
      let li = document.createElement("li");
      li.innerHTML = "Right Wrist";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.leftThigh==0) {
      let li = document.createElement("li");
      li.innerHTML = "Left Thigh";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.leftLeg==0) {
      let li = document.createElement("li");
      li.innerHTML = "Left Leg";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.rightThigh==0) {
      let li = document.createElement("li");
      li.innerHTML = "Right Thigh";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    if (output.rightLeg==0) {
      let li = document.createElement("li");
      li.innerHTML = "Right Leg";
      document.getElementById('list').appendChild(li);
      result = 1;
    }
    
    if (flag != 0) {
      if (flag == 1) document.getElementById('text').innerHTML = "Image not clear";
      if (flag == 2) document.getElementById('text').innerHTML = "Video not clear";
      document.getElementById('tick').src = require('./images/cross.png');
    }
    else if (result == 0) {
      document.getElementById('text').innerHTML = "Correct Posture";
      document.getElementById('tick').src = require('./images/Green_tick.png');
    }
    else {
      document.getElementById('text').innerHTML = "Adjust the Position of:";
      document.getElementById('tick').src = "";
    } 
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.8, ctx);
    drawSkeleton(pose["keypoints"], 0.9, ctx);
  };

  runPosenet();

  return (
    <div className="App">
      <div className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 560,
            height: 420,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 560,
            height: 420,
          }}
        />
      </div>
      <div id="block" style={{
        display: "flex",
        flexFlow: "column wrap",
          textAlign: "center",
          color: "white",
          marginLeft: "auto",
          marginRight: "auto",
          minWidth: 200,
          minHeight: 480,
      }}><h3 id="text"></h3>
        <ol style={{textAlign: "left", margin: "auto"}} id="list"></ol>
        <img id="tick" style={{height: 150, width: 150, border: 'none', margin: "auto"}}></img>
      </div>
      <div style={{display: "flex"}}>
        <img id='girl' style={{ width: 560, height: 420, zindex: 9 }} src={require('./images/DATASET/TRAIN/goddess/00000258.jpg')} alt='Image not loaded'></img>
        {/* <canvas
          ref={canvasRef}
          style={{
            // marginLeft: "auto",
            // marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 10,
            width: 560,
            height: 420,
          }}
        /> */}
      </div>
    </div>
  );
}

export default App;
