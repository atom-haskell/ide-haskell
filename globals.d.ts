interface Function {
  bind<T> (this: T, thisArg: any): T;
}

interface Array<T> {
  map<U, V>(callbackfn: (value: T, index: number, array: T[]) => [U, V], thisArg?: any): [U, V][];
}
