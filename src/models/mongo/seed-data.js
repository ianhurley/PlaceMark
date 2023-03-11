export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret"
      }
    },
    swimlists: {
      _model: "Swimlist",
      leinster: {
        title: "Leinster",
        userid: "->users.bart"
      }
    },
    spots: {
      _model : "Spot",
      spot_1 : {
        name: "Bull Wall, Clontarf Road",
        county: "Dublin",
        latitude: "53.354531",
        longitude: "-6.169717",
        categorey: "The Sea",
        swimlistid: "->swimlists.leinster"
      },
      spot_2 : {
        name: "Irelands Eye",
        county: "Dublin",
        latitude: "53.405145",
        longitude: "-6.066119",
        categorey: "The Sea",
        swimlistid: "->swimlists.leinster"
      },
      spot_3 : {
        name: "Lough Bray Lower",
        county: "Wicklow",
        latitude: "53.185735",
        longitude: "-6.292679",
        categorey: "Loughs",
        swimlistid: "->swimlists.leinster"
      },
    },
  };