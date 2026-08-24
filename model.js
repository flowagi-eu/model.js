const creationToken = Symbol("Model");

export class Model {
  static shape = {};

  static create(props) {
    this.validate(props, this.shape);
    return new this(props, creationToken);
  }

  constructor(props, token) {
    if (token !== creationToken)
      throw new TypeError(
        `${this.constructor.name} must be created using .create()`
      );

    Object.assign(this, props);
  }

  static validate(data, definition) {
    for (const [key, type] of Object.entries(definition)) {
      if (!(key in data))
        throw new TypeError(`Missing field: ${key}`);

      if (!this.check(data[key], type))
        throw new TypeError(`Invalid type: ${key}`);
    }

    for (const key of Object.keys(data)) {
      if (!(key in definition))
        throw new TypeError(`Unknown field: ${key}`);
    }
  }

  static check(value, type) {
    if (type?.list)
      return Array.isArray(value) &&
        value.every(v => this.check(v, type.list));

    if (type === String) return typeof value === "string";
    if (type === Number) return typeof value === "number" && !Number.isNaN(value);
    if (type === Boolean) return typeof value === "boolean";
    if (type === Object) return value?.constructor === Object;
    if (type === Array) return Array.isArray(value);

    return value instanceof type;
  }
}

export const List = type => ({ list: type });
