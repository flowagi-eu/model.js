import { Model,List } from '../model.js';


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
      city: "Malaga",
      country: "Spain"
    }),

    roles: ["admin", "user"]
  });

  console.log("Profile:", profile);
} catch (error) {
  console.error(error.message);
}


// ─────────────────────────────────────────────
// Demo 4: Invalid type
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
// Demo 5: Missing field
// ─────────────────────────────────────────────

try {
  User.create({
    name: "John"
  });
} catch (error) {
  console.error("Missing field:", error.message);
}


// ─────────────────────────────────────────────
// Demo 6: Unknown field
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
// Demo 7: Direct construction is forbidden
// ─────────────────────────────────────────────

try {
  new User({
    name: "John",
    age: 25
  });
} catch (error) {
  console.error("Direct construction:", error.message);
}
