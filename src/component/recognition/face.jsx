import { Component, createRef } from 'preact'

import ml5 from 'ml5'
export default class Face extends Component {


    constructor() {
        super();
        this.webCam = createRef();
        this.camCanvas = createRef();
        this.HEIGHT = 400;
        this.WIDTH = 600;
        this.modelLoaded = false;

        this.state = {};

        this.runDetection = this.runDetection.bind(this);
        this.drawCameraIntoCanvas = this.drawCameraIntoCanvas.bind(this);
    }

    initializeModel() {
        let detectionOptions = {
            withLandmarks: true,
            withDescriptors: false,
        };
        this.faceNet = ml5.faceApi(this.webCam.current, detectionOptions, () => {
            console.log("Model Initilaized", this.faceNet);
            this.modelLoaded = true;
        });
    }

    runDetection() {
        this.faceNet.detectSingle((error, result) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log(result);
                this.drawBox(result);
            }
            // this.faces = result;
        });
    }

    drawBox(detections) {
        this.foundFace = true;
        for (let i = 0; i < detections.length; i += 1) {
            const alignedRect = detections[i].alignedRect;
            const x = alignedRect._box._x;
            const y = alignedRect._box._y;
            const boxWidth = alignedRect._box._width;
            const boxHeight = alignedRect._box._height;

            this.ctx.beginPath();
            this.ctx.rect(x, y, boxWidth, boxHeight);
            this.ctx.strokeStyle = "#a15ffb";
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    drawCameraIntoCanvas() {
        if (this.modelLoaded) {
            this.ctx.drawImage(this.webCam.current, 0, 0, 640, 480);
            this.runDetection();
        }
        requestAnimationFrame(this.drawCameraIntoCanvas);
    }

    componentDidMount() {
        this.ctx = this.camCanvas.current.getContext('2d');
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
        }
        navigator.mediaDevices
            .getUserMedia({
                'audio': false,
                'video': {
                    facingMode: 'user',
                    width: this.WIDTH,
                    height: this.HEIGHT,
                    frameRate: 25,
                },
            }).then(res => {
                if (res != null) {
                    this.stream = res;
                    this.webCam.current.srcObject = this.stream;
                    this.webCam.current?.play();

                    this.drawCameraIntoCanvas();
                    this.initializeModel();
                }
            });
    }

    componentWillUnmount() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }

    render() {
        const camStyle = {
            display: 'none'
        }

        return (
            <div className="container">
                <h2>face-api on ml5</h2>
                <canvas ref={this.camCanvas} width={this.WIDTH} height={this.HEIGHT} />
                <video playsInline ref={this.webCam} width={this.WIDTH} height={this.HEIGHT} style={camStyle} />
                {this.foundFace ? "Drawing Bounding Box" : "Look into Camera!!!"}
            </div>
        );
    }
}