import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vibora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vibora.component.html',
  styleUrls: ['./vibora.component.scss']
})
export class ViboraComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  snake: { x: number, y: number }[] = [];
  dx = 10;
  dy = 0;
  foodX!: number;
  foodY!: number;
  changingDirection = false;
  gameStarted = false;
  gameOver = false;
  score = 0;
  playerName = '';

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.generateFood();

    // Usa capture=true para interceptar antes del scroll
    document.addEventListener('keydown', this.changeDirection.bind(this), true);
  }

  startGame() {
    if (!this.playerName.trim()) {
      alert('Please enter your name');
      return;
    }
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.resetGame();
    this.main();
  }

  resetGame() {
    this.snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 },
      { x: 110, y: 150 }
    ];
    this.dx = 10;
    this.dy = 0;
    this.generateFood();
    if (!this.gameStarted) {
      this.gameOver = false;
      this.score = 0;
    }
  }

  main() {
    if (this.didGameEnd()) {
      this.gameOver = true;
      this.gameStarted = false;
      return;
    }

    this.changingDirection = false;
    setTimeout(() => {
      this.clearCanvas();
      this.drawFood();
      this.advanceSnake();
      this.drawSnake();
      this.main();
    }, 100);
  }

  clearCanvas() {
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake() {
    this.snake.forEach(this.drawSnakePart.bind(this));
  }

  drawSnakePart(snakePart: { x: number, y: number }) {
    this.ctx.fillStyle = 'red';  // Cambiar el color de la serpiente a rojo
    this.ctx.strokeStyle = 'darkred';
    this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }

  advanceSnake() {
    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
    this.snake.unshift(head);

    const didEatFood = this.snake[0].x === this.foodX && this.snake[0].y === this.foodY;
    if (didEatFood) {
      this.score += 10;  // Incrementar el score
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  changeDirection(event: KeyboardEvent) {
    if (!this.gameStarted) return;

    // Previene el scroll con las flechas
    const arrowKeys = [37, 38, 39, 40];
    if (arrowKeys.includes(event.keyCode)) {
      event.preventDefault();
    }

    if (this.changingDirection) return;

    this.changingDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = this.dy === -10;
    const goingDown = this.dy === 10;
    const goingRight = this.dx === 10;
    const goingLeft = this.dx === -10;

    if (keyPressed === 37 && !goingRight) {
      this.dx = -10;
      this.dy = 0;
    }
    if (keyPressed === 38 && !goingDown) {
      this.dx = 0;
      this.dy = -10;
    }
    if (keyPressed === 39 && !goingLeft) {
      this.dx = 10;
      this.dy = 0;
    }
    if (keyPressed === 40 && !goingUp) {
      this.dx = 0;
      this.dy = 10;
    }
  }


  didGameEnd() {
    for (let i = 4; i < this.snake.length; i++) {
      if (this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y) return true;
    }

    const hitLeftWall = this.snake[0].x < 0;
    const hitRightWall = this.snake[0].x > this.canvas.width - 10;
    const hitTopWall = this.snake[0].y < 0;
    const hitBottomWall = this.snake[0].y > this.canvas.height - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  }

  generateFood() {
    this.foodX = this.randomTen(0, this.canvas.width - 10);
    this.foodY = this.randomTen(0, this.canvas.height - 10);

    this.snake.forEach(part => {
      const hasEaten = part.x === this.foodX && part.y === this.foodY;
      if (hasEaten) this.generateFood();
    });
  }

  randomTen(min: number, max: number) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  drawFood() {
    this.ctx.fillStyle = 'gold';  // Cambiar el color de la comida a dorado
    this.ctx.strokeStyle = 'darkgoldenrod';
    this.ctx.fillRect(this.foodX, this.foodY, 10, 10);
    this.ctx.strokeRect(this.foodX, this.foodY, 10, 10);
  }

  closeModal() {
    this.close.emit();
  }
}
