const { Boat, Company } = require("../db");

const boats = [
  {
    name: "La Chinita",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/sercyn-22d2f.appspot.com/o/web-images%2FE5DC0131-5725-43BC-9EDE-563109C1F887.jpeg?alt=media&token=052541ee-cdcd-4de9-b22c-e5d58329c424",
    capacity: 8,
    CompanyId: 1,
  },
  {
    name: "La Chelita",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/sercyn-22d2f.appspot.com/o/web-images%2F94EAEC10-7E83-4B8A-87BF-610BA8BBB9FF.jpeg?alt=media&token=7a97d955-b6ca-4ac6-b9ba-21e0de8d5e34",
    capacity: 8,
    CompanyId: 1,
  },
  {
    name: "Bati-Boat",
    photo:
      "https://i.pinimg.com/originals/94/2f/c6/942fc6c9f1f8753eb43c5e54e65d03b8.jpg",
    capacity: 5,
    CompanyId: 2,
  },
  {
    name: "Marine Technologies",
    photo:
      "https://images.boatsgroup.com/images/1/0/13/5910013_20190211075038891_1_XLARGE.jpg?w=360&h=120",
    capacity: 5,
    CompanyId: 3,
  },
  {
    name: "Wonder Boat",
    photo:
      "https://media.boatsnews.com/src/images/news/articles/ima-image-35139.jpg",
    capacity: 18,
    CompanyId: 3,
  },
];

const mapBoats = boats.map((el) => {
  return {
    name: el.name,
    photo: el.photo,
    capacity: el.capacity,
    CompanyId: el.CompanyId,
  };
});

const bulkBoats = async () => {
  await Boat.bulkCreate(mapBoats);
  console.log("Boats created");
};

module.exports = bulkBoats;
