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


## Working with Web Components?
Try [Flo Shapes](https://github.com/flowagi-eu/flo-plugin-shapes) instead.
