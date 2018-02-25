export type Binding<T> = () => T;
export type BindableProperty<T> = T | Binding<T>;

export function bind<T, K extends keyof T>(
  object: T,
  key: K
): BindableProperty<T[K]> {
  return () => object[key];
}

export function getValue<T>(property: BindableProperty<T>): T {
  return typeof property === "function" ? property() : property;
}
