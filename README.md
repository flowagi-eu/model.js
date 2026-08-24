# Model

A tiny base class for creating and validating **domain objects**.

## Usage

```js
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

Models must be created with `.create()`:

```js
new User({ name: "John", age: 25 });
// TypeError
```

This keeps validation at the boundary:

```text
raw data → Model.create() → validated domain object → application logic
```

A class is just a JavaScript mechanism. A domain object represents a meaningful concept in your application. `Model` provides a small, simple boundary for those concepts without turning them into complex enterprise entities or coupling them to persistence.

## Install

Clone the repository:

```bash
git clone https://github.com/your-user/model.git
```

Then import `Model` directly:

```js
import { Model } from "./model.js";
```

## Compared

|                    |   Model | Zod | Mongoose | Sequelize | TypeORM | Prisma |
| ------------------ | ------: | --: | -------: | --------: | ------: | -----: |
| Class-based        | **Yes** |  No |      Yes |       Yes |     Yes |     No |
| Runtime validation | **Yes** | Yes |      Yes |       Yes |     Yes |    Yes |
| Database / ORM     |      No |  No |      Yes |       Yes |     Yes |    Yes |


