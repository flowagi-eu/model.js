const creationToken = Symbol("Model");

export const List = type => ({ list: type });

export class Model {
  static shape = {};
  static shapeFns = {};

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

    this.validateFns(data);

    return true;
  }

  static validateFns(data) {
    for (const [key, fn] of Object.entries(this.shapeFns)) {
      if (!(key in data))
        continue;

      const result = fn(data[key], data);

      if (!Array.isArray(result) || result[0] !== 0) {
        const message =
          Array.isArray(result) && result[1]
            ? result[1]
            : `Invalid value: ${key}`;

        throw new TypeError(message);
      }
    }
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

    return typeof type === "function" && value instanceof type;
  }
}


// ─────────────────────────────────────────────
// Demo 1: Basic model
// ─────────────────────────────────────────────

class User extends Model {
  static shape = {
    name: String,
    age: Number
  };
}

try {
  const user = User.create({
    name: "John",
    age: 25
  });

  console.log("User:", user);
} catch (error) {
  console.error(error.message);
}


// ─────────────────────────────────────────────
// Demo 2: Inline nested object
// ─────────────────────────────────────────────

class UserCard extends Model {
  static shape = {
    user: {
      name: String,
      age: Number
    }
  };
}

try {
  const card = UserCard.create({
    user: {
      name: "Jane",
      age: 30
    }
  });

  console.log("UserCard:", card);
} catch (error) {
  console.error(error.message);
}


// ─────────────────────────────────────────────
// Demo 3: Nested Model + List
// ─────────────────────────────────────────────

class Address extends Model {
  static shape = {
    city: String,
    country: String
  };
}

class Profile extends Model {
  static shape = {
    user: User,
    address: Address,
    roles: List(String)
  };
}

try {
  const profile = Profile.create({
    user: User.create({
      name: "Alice",
      age: 28
    }),

    address: Address.create({
      city: "Amsterdam",
      country: "The Netherlands"
    }),

    roles: ["admin", "user"]
  });

  console.log("Profile:", profile);
} catch (error) {
  console.error(error.message);
}


// ─────────────────────────────────────────────
// Demo 4: Custom shape functions
// ─────────────────────────────────────────────

class Customer extends Model {
  static shape = {
    name: String,
    email: String,
    age: Number
  };

  static shapeFns = {
    name: value =>
      value.length >= 2
        ? [0]
        : [1, "Name must be at least 2 characters"],

    email: value =>
      value.includes("@")
        ? [0]
        : [1, "Email must contain @"],

    age: value =>
      value >= 18
        ? [0]
        : [1, "Customer must be at least 18 years old"]
  };
}

try {
  const customer = Customer.create({
    name: "John",
    email: "john@example.com",
    age: 25
  });

  console.log("Customer:", customer);
} catch (error) {
  console.error(error.message);
}


// ─────────────────────────────────────────────
// Demo 5: Custom function failure
// ─────────────────────────────────────────────

try {
  Customer.create({
    name: "J",
    email: "john@example.com",
    age: 25
  });
} catch (error) {
  console.error("Shape function:", error.message);
}


// ─────────────────────────────────────────────
// Demo 6: Invalid type
// ─────────────────────────────────────────────

try {
  User.create({
    name: "John",
    age: "25"
  });
} catch (error) {
  console.error("Invalid type:", error.message);
}


// ─────────────────────────────────────────────
// Demo 7: Missing field
// ─────────────────────────────────────────────

try {
  User.create({
    name: "John"
  });
} catch (error) {
  console.error("Missing field:", error.message);
}


// ─────────────────────────────────────────────
// Demo 8: Unknown field
// ─────────────────────────────────────────────

try {
  User.create({
    name: "John",
    age: 25,
    email: "john@example.com"
  });
} catch (error) {
  console.error("Unknown field:", error.message);
}


// ─────────────────────────────────────────────
// Demo 9: Direct construction is forbidden
// ─────────────────────────────────────────────

try {
  new User({
    name: "John",
    age: 25
  });
} catch (error) {
  console.error("Direct construction:", error.message);
}
