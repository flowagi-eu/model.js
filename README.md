# Model

A tiny base class for creating and validating **domain objects**.

JS functions often pass plain objects everywhere, leaving validation scattered across the application. `Model` gives meaningful concepts a small, explicit JavaScript shape definition without turning them into complex entities.


## Usage

```js id="6fpl8k"
import { Model } from "./model.js";

class User extends Model {
  static shape = {
    name: String,
    age: Number
  };
}

const user = User.create({
  name: "John",
  age: 25
});
```

Nested objects are supported:

```js id="gd5r4j"
class UserCard extends Model {
  static shape = {
    user: {
      name: String,
      age: Number
    }
  };
}

const card = UserCard.create({
  user: {
    name: "John",
    age: 25
  }
});
```

Nested domain objects can also use other `Model` classes.

`Model` validates input and creates small, composable domain objects. It does not handle persistence, databases, or complex entity management.

## Install

```bash id="v2z0z4"
git clone https://github.com/your-user/model.git
```

## Compared

|                    |   Model | Zod | Mongoose | Sequelize | TypeORM | Prisma |
| ------------------ | ------: | --: | -------: | --------: | ------: | -----: |
| Class-based        | **Yes** |  No |      Yes |       Yes |     Yes |     No |
| Runtime validation | **Yes** | Yes |      Yes |       Yes |     Yes |    Yes |
| Database / ORM     |      No |  No |      Yes |       Yes |     Yes |    Yes |

## Supported Types

| Type Example  | Example                       |
| ------------- | ----------------------------- |
| `String`      | `name: String`                |
| `Number`      | `count: Number`               |
| `Boolean`     | `active: Boolean`             |
| `Object`      | `data: Object`                |
| `Array`       | `items: Array`                |
| `Model`       | `user: User`                  |
| Any class     | `date: Date`                  |
| Nested shape  | `user: { name: String }`      |
| `List(type)`  | `items: List(String)`         |
| `List(class)` | `cards: List(UserCard)`       |
| `List(shape)` | `items: List({ id: Number })` |

### Custom validation

Use `shapeFns` for additional validation rules beyond the basic types:

```js
class User extends Model {
  static shape = {
    name: String,
    age: Number
  };

  static shapeFns = {
    name: value =>
      value.length >= 2
        ? [0]
        : [1, "Name must be at least 2 characters"],

    age: value =>
      value >= 18
        ? [0]
        : [1, "User must be at least 18 years old"]
  };
}
```

`shapeFns` functions receive the value and complete props object. Return `[0]` for success or `[1, error]` for failure.

```js
User.create({ name: "John", age: 25 }); // ✓
User.create({ name: "J", age: 25 });    // throws
```



## Working with Web Components?
Try [Flo Shapes](https://github.com/flowagi-eu/flo-plugin-shapes) instead.
