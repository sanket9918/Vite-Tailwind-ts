import { Component, createRef } from 'preact'
import { poseNet } from 'ml5'

export default class Pose extends Component {
    constructor() {
        super();
        this.webCam = createRef();
        this.camCanvas = createRef();
        this.HEIGHT = 400;
        this.WIDTH = 600;
        this.modelLoaded = false;
        this.state = {
            detected: false
        };
    }

    initializeModel() {
        this.poseNet = poseNet(this.webCam.current, () => {
            console.log("Model Initilaized");
            this.modelLoaded = true;
            this.poseNet.on('pose', (result) => {
                this.poses = result;
                this.setState({
                    detected: result !== undefined && result.length > 0 ? true : false
                })
                console.log(result)
            });
        });
    }

    drawKeypoints() {
        for (let i = 0; i < this.poses.length; i++) {
            for (let j = 0; j < this.poses[i].pose.keypoints.length; j++) {
                let keypoint = this.poses[i].pose.keypoints[j];
                if (keypoint.score > 0.2) {
                    this.ctx.fillStyle = "#c82124";
                    this.ctx.beginPath();
                    this.ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
    }

    drawSkeleton() {
        for (let i = 0; i < this.poses.length; i++) {
            for (let j = 0; j < this.poses[i].skeleton.length; j++) {
                let partA = this.poses[i].skeleton[j][0];
                let partB = this.poses[i].skeleton[j][1];
                this.ctx.beginPath();
                this.ctx.moveTo(partA.position.x, partA.position.y);
                this.ctx.lineTo(partB.position.x, partB.position.y);
                this.ctx.stroke();
            }
        }
    }

    drawCameraIntoCanvas() {
        if (this.modelLoaded) {
            this.ctx.drawImage(this.webCam.current, 0, 0, this.WIDTH, this.HEIGHT)
        }
        if (this.poses !== undefined) {
            this.drawKeypoints();
            this.drawSkeleton();
        }
        requestAnimationFrame(this.drawCameraIntoCanvas.bind(this));
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
                    frameRate: 15, // Reduce this if there's a stuttering in feed
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
            display: 'none',

        }

        return (
            <div className="container">
                <h2>Posenet on ml5</h2>
                <canvas ref={this.camCanvas} width={this.WIDTH} height={this.HEIGHT} style={{ textAlign: 'center', margin: 'auto' }} />
                <video playsInline ref={this.webCam} width={this.WIDTH} height={this.HEIGHT} style={camStyle} />
                {this.state.detected ? (<div className='px-6 py-4 bg-green-300 text-green-600 w-full sm:w-1/6 text-center mx-auto rounded-xl mt-6'>Found You!</div>) : (
                    <div className='px-6 py-4 bg-red-300 text-red-600 w-full sm:w-1/6 text-center mx-auto rounded-xl mt-6'>Show Yourself</div>
                )}
            </div>
        );
    }
}
