const makeCssMock = (name: string): unknown =>
  new Proxy(
    {},
    {
      get(_target, key): unknown {
        if (key === "__esModule") return true;
        if (key === Symbol.toPrimitive) return (): string => name;
        if (key === "toString" || key === "valueOf") return (): string => name;
        if (typeof key === "symbol") return undefined;

        return makeCssMock(key.toString());
      },
    }
  );

module.exports = makeCssMock("css-mock");
