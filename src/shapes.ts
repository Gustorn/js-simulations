import { BindableProperty, getValue } from "hovl/bind";
import { Vector } from "hovl/vector";

export interface Trs {
  translate: BindableProperty<Vector>;
  rotate: BindableProperty<number>;
  scale: BindableProperty<Vector>;
}

export abstract class Shape {
  public color: string;

  public translate: BindableProperty<Readonly<Vector>>;
  public rotate: BindableProperty<number>;
  public scale: BindableProperty<Readonly<Vector>>;

  constructor(
    color: string,
    { translate = Vector(0, 0), rotate = 0, scale = Vector(1, 1) }: Partial<Trs>
  ) {
    this.color = color;

    this.translate = translate;
    this.rotate = rotate;
    this.scale = scale;
  }

  public draw(context: CanvasRenderingContext2D): void {
    const translate = getValue(this.translate);
    const rotate = getValue(this.rotate);
    const scale = getValue(this.scale);

    context.save();
    context.translate(translate.x, translate.y);
    context.rotate(rotate);
    context.scale(scale.x, scale.y);
    this.drawInternal(context);
    context.restore();
  }

  protected abstract drawInternal(context: CanvasRenderingContext2D): void;
}

export class Circle extends Shape {
  public radius: BindableProperty<number>;

  constructor(
    radius: BindableProperty<number>,
    color: string,
    trs: Partial<Trs>
  ) {
    super(color, trs);
    this.radius = radius;
  }

  protected drawInternal(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(0, 0, getValue(this.radius), 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Line extends Shape {
  public a: Vector;
  public b: Vector;
  public width: number;

  constructor(a: Vector, b: Vector, width: number, color: string, trs: Partial<Trs>) {
    super(color, trs);
    this.a = Vector(a);
    this.b = Vector(b);
    this.width = width;
  }

  protected drawInternal(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.moveTo(this.a.x, this.a.y);
    context.lineTo(this.b.x, this.b.y);
    context.stroke();
  }
}
