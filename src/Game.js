import React, {Component} from 'react';

class Canvas extends Component {

    constructor(props) {
        super(props)

        this.state = {
          height : 600,
            width : 700,
            ballXpos: 20,
            ballYpos:30,
            dx:2,
            dy:2,
            time:Date.now(),
            ballRadius:10,
            paddleHeight:10,
            paddleWidth:75,
            paddleX:100,
            rightPressed:false,
            leftPressed:false
        };

        this.canvas = React.createRef();
        this.keyUpHandler = this.keyDownHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }


    componentDidMount() {
        this.interval = setInterval(() => {

            let paddleX = this.state.paddleX;

            if(this.state.rightPressed && paddleX < this.state.width-this.state.paddleWidth) {
                paddleX +=7;
            }
            else if(this.state.leftPressed && paddleX > 0) {
                paddleX -=7;
            }

            this.setState({ time: Date.now() ,
            ballXpos:this.state.ballXpos + this.state.dx,
            ballYpos:this.state.ballYpos + this.state.dy,
                paddleX:paddleX
        })}, 10);
        document.addEventListener('keydown', this.keyDownHandler,false);
        document.addEventListener('keyup', this.keyUpHandler,false);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        document.removeEventListener('keydown', this.keyDownHandler,false);
        document.removeEventListener('keyup', this.keyUpHandler,false)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.draw();
    }

     keyDownHandler(e) {
         if(e.key == "Right" || e.key == "ArrowRight") {
             this.setState({rightPressed:true})
         }

         else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.setState({leftPressed:true})
        }
    }

     keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.setState({rightPressed:false})
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.setState({leftPressed:false})
        }
    }

    drawPaddle() {
        const ctx = this.canvas.current.getContext('2d');
        ctx.beginPath();
        ctx.rect(this.state.paddleX, this.state.height-this.state.paddleHeight, this.state.paddleWidth, this.state.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    drawBall(){
        const ctx = this.canvas.current.getContext('2d');
        const ballRadius = 10;
        ctx.beginPath();
        ctx.arc(this.state.ballXpos, this.state.ballYpos, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

     draw() {
        const ctx = this.canvas.current.getContext('2d');
        ctx.clearRect(0, 0, this.state.width, this.state.height);
        let x = this.state.ballXpos;
        let y = this.state.ballYpos;
        let dx = this.state.dx;
        let dy = this.state.dy;
        let rightPressed = this.state.rightPressed;
        let leftPressed = this.state.leftPressed;
        let paddleX = this.state.paddleX;
        let paddleWidth = this.state.paddleWidth;



         if(x + dx > this.state.width-this.state.ballRadius || x + dx < this.state.ballRadius) {
             this.setState({dx:-dx});
         }
         if(y + dy > this.state.height-this.state.ballRadius || y + dy < this.state.ballRadius) {
             this.setState({dy:-dy});
         }


         this.drawBall();
         this.drawPaddle();


    }

    render() {
        return (
            <div>
                <canvas ref = {this.canvas} height = {this.state.height} width = {this.state.width}> </canvas>
            </div>
        );
    }
}

export default Canvas;