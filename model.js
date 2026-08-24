const creationToken = Symbol("Model");

export const List = type => ({ list: type });

export class Model {
  static shape = {};

  static create(props) {
    this.validate(props, this.shape);
    return new this(props, creationToken);
  }

  constructor(props, token) {
    if (token !== creationToken) {
      throw new TypeError(
        `${this.constructor.name} must be created using .create()`
      );
    }

    Object.assign(this, props);
  }

  static validate(data, definition) {
    if (data?.constructor !== Object)
      throw new TypeError("Expected an object");

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

    return true;
  }

  static check(value, type) {
    if (type?.list) {
      return Array.isArray(value) &&
        value.every(item => this.check(item, type.list));
    }

    if (type && typeof type === "object") {
      return value?.constructor === Object &&
        this.validate(value, type);
    }

    if (type === String)
      return typeof value === "string";

    if (type === Number)
      return typeof value === "number" && !Number.isNaN(value);

    if (type === Boolean)
      return typeof value === "boolean";

    if (type === Object)
      return value?.constructor === Object;

    if (type === Array)
      return Array.isArray(value);

    return value instanceof type;
  }
}


