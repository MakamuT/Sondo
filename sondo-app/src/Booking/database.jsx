import { db } from "../Auth/firebase"; // Adjust the path as needed
import { collection, addDoc } from "firebase/firestore";

const wheelchairs = [
  { name: "Wheelchair 1", available: true, location: "Mall of Africa" },
  { name: "Wheelchair 2", available: false, location: "Mall of Africa" },
  { name: "Wheelchair 3", available: true, location: "Mall of Africa" },
];

const addWheelchairs = async () => {
  try {
    const promises = wheelchairs.map((wheelchair) =>
      addDoc(collection(db, "wheelchairs"), wheelchair)
    );
    await Promise.all(promises);
    console.log("All wheelchairs added!");
  } catch (error) {
    console.error("Error adding wheelchairs: ", error);
  }
};

addWheelchairs();
