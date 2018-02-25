import { bind } from "hovl/bind";
import { Scene } from "hovl/scene";
import { Circle } from "hovl/shapes";
import { Vector } from "hovl/vector";

class CircleSimulation {
  public first = Vector(2, 2);
  public second = Vector(8, 8);

  public update(time: number): void {
    this.first.x = 5 + Math.sin(time) * 3;
    this.second.y = 5 + Math.sin(time) * 3;
  }
}

class CirclesScene extends Scene {
  private simulation = new CircleSimulation();

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.shapes = [
      new Circle(1, "#00FF00", {
        translate: bind(this.simulation, "first")
      }),
      new Circle(1, "#0000FF", {
        translate: bind(this.simulation, "second")
      })
    ];
  }

  protected update(time: number): void {
    this.simulation.update(time);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new CirclesScene(canvas);

  scene.setCanvasSize(600, 600);
  scene.setViewport(0, 0, 10);

  scene.start();
});
