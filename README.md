# Model

A tiny base class for validated **domain objects**.

A class is just a JavaScript mechanism. A domain object represents a meaningful concept in your application.

`Model` gives those concepts a simple boundary: define a `shape`, then use `.create()` to turn untrusted data into a validated object.

## Usage

```js
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

The goal isn't to create complex enterprise entities. It's simply to make important concepts explicit and give them a small, reliable home for their data and behavior.

## Compared

|                    |   Model | Zod | Mongoose | Sequelize | TypeORM | Prisma |
| ------------------ | ------: | --: | -------: | --------: | ------: | -----: |
| Class-based        | **Yes** |  No |      Yes |       Yes |     Yes |     No |
| Runtime validation | **Yes** | Yes |      Yes |       Yes |     Yes |    Yes |
| Database / ORM     |      No |  No |      Yes |       Yes |     Yes |    Yes |

**Model** focuses on one thing: creating small, validated, class-based domain objects without coupling them to persistence.

