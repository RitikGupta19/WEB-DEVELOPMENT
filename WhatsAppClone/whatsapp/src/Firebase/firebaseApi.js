import db from "./firebase";

export const getRooms = () => {
  /* NOTE -> The below api is for a single time fetch and forget for 
  all docs brought*/

  // STUB
  //b.collection("rooms")
  //   .get()
  //   .then(function (querySnapshot) {
  //     querySnapshot
  //       .forEach(function (doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //       })
  //       .catch((err) => {});
  //   });

  /* NOTE -> This will keeep an eye on all changes and will fetch in real time*/
  var promise = new Promise((resolve, reject) => {
    db.collection("rooms").onSnapshot((snapshot) => {
      console.log("on snapshot called");
      if (snapshot.docs) resolve(snapshot.docs);
      else reject("Error in fetching documents");
    });
  });
  return promise;
};

export const addRooms = (name) => {
  db.collection("rooms").add({
    name: name,
  });
};
