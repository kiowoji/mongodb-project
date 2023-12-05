import { connect, close } from "./connection.js";

const db = await connect();
const usersCollection = db.collection("users");

const run = async () => {
  try {
    //await getUsersExample();
    // await task1();
    // await task2();
    // await task3();
    // await task4();
    // await task5();
    // await task6();
    // await task7();
    // await task8();
    // await task9();
    // await task10();
    // await task11();
    // await task12();

    await close();
  } catch (err) {
    console.log("Error: ", err);
  }
};
run();

// #### Users
// - Get users example
async function getUsersExample() {
  try {
    const [allUsers, firstUser] = await Promise.all([
      usersCollection.find().toArray(),
      usersCollection.findOne(),
    ]);

    console.log("allUsers", allUsers);
    console.log("firstUser", firstUser);
  } catch (err) {
    console.error("getUsersExample", err);
  }
}

// - Get all users, sort them by age (ascending), and return only 5 records with firstName, lastName, and age fields.
async function task1() {
  try {
    const [sortedUsers] = await Promise.all([
      usersCollection
        .find({})
        .project({ firstName: 1, lastName: 1, age: 1, _id: 0 })
        .sort({ age: 1 })
        .limit(5)
        .toArray(),
    ]);

    console.log("sortedUsers", sortedUsers);
  } catch (err) {
    console.error("task1", err);
  }
}

// - Add new field 'skills: []" for all users where age >= 25 && age < 30 or tags includes 'Engineering'
async function task2() {
  try {
    const result = await usersCollection.updateMany(
      {
        $or: [{ age: { $gte: 25, $lt: 30 } }, { tags: "Engineering" }],
      },
      {
        $set: { skills: [] },
      }
    );

    console.log(
      `${result.modifiedCount} users updated with the 'skills' field.`
    );
  } catch (err) {
    console.error("task2", err);
  }
}

// - Update the first document and return the updated document in one operation (add 'js' and 'git' to the 'skills' array)
//   Filter: the document should contain the 'skills' field
async function task3() {
  try {
    const result = await usersCollection.findOneAndUpdate(
      { skills: { $exists: true } },
      { $push: { skills: { $each: ["js", "git"] } } },
      { returnDocument: "after" }
    );

    console.log("Updated document:", result);
  } catch (err) {
    console.error("task3", err);
  }
}

// - REPLACE the first document where the 'email' field starts with 'john' and the 'address state' is equal to 'CA'
//   Set firstName: "Jason", lastName: "Wood", tags: ['a', 'b', 'c'], department: 'Support'
async function task4() {
  try {
    const result = await usersCollection.updateOne(
      { email: /^john/, "address.state": "CA" },
      {
        $set: {
          firstName: "Jason",
          lastName: "Wood",
          tags: ["a", "b", "c"],
          department: "Support",
        },
      }
    );

    console.log(result.modifiedCount, "document updated");
  } catch (err) {
    console.log("task4", err);
  }
}

// - Pull tag 'c' from the first document where firstName: "Jason", lastName: "Wood"
async function task5() {
  try {
    const result = await usersCollection.updateOne(
      { "firstName": "Jason", "lastName": "Wood" },
      { $pull: {tags:"c"}}
    );

    console.log(`Tag 'c' was pulled from ${result.modifiedCount} document.`)
  } catch (err) {
    console.log("task5", err);
  }
}

// - Push tag 'b' to the first document where firstName: "Jason", lastName: "Wood"
//   ONLY if the 'b' value does not exist in the 'tags'
async function task6() {
  try {
        const result = await usersCollection.updateOne(
          { firstName: "Jason", lastName: "Wood" },
          { $addToSet: { tags: "b" }}
        );

        console.log(
          `Tag 'b' was pushed to ${result.modifiedCount} document.`
        );
  } catch (err) {
    console.log("task6", err);
  }
}

// - Delete all users by department (Support)
async function task7() {
  try {
    const result = await usersCollection.deleteMany({ department: "Support" });
    console.log(`${result.deletedCount} user was deleted.`)
  } catch (err) {
    console.log("task7", err);
  }
}

// #### Articles
// - Create new collection 'articles'. Using bulk write:
//   Create one article per each type (a, b, c)
//   Find articles with type a, and update tag list with next value ['tag1-a', 'tag2-a', 'tag3']
//   Add tags ['tag2', 'tag3', 'super'] to articles except articles with type 'a'
//   Pull ['tag2', 'tag1-a'] from all articles
async function task8() {
  try {
  } catch (err) {
    console.error("task8", err);
  }
}

// - Find all articles that contains tags 'super' or 'tag2-a'
async function task9() {
  try {
  } catch (err) {
    console.log("task9", err);
  }
}

// #### Students Statistic (Aggregations)
// - Find the student who have the worst score for homework, the result should be [ { name: <name>, worst_homework_score: <score> } ]
async function task10() {
  try {
  } catch (err) {
    console.log("task10", err);
  }
}

// - Calculate the average score for homework for all students, the result should be [ { avg_score: <number> } ]
async function task11() {
  try {
  } catch (err) {
    console.log("task11", err);
  }
}

// - Calculate the average score by all types (homework, exam, quiz) for each student, sort from the largest to the smallest value
async function task12() {
  try {
  } catch (err) {
    console.log("task12", err);
  }
}
