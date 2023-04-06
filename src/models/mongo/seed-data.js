export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "$2a$10$HnapEWWKQQ0.0Ft33nXxtuJ0fsmd9ywYswEzT4C.6Ul5y6cOU.UEa"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "$2a$10$D3TWK8MSAh63Lhk4gIFSJ.ekM368J88qJRUYSbuBfzffex6B0dFwK"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "$2a$10$7I04HDh0xV9/ceGCGRztUO3Uqa4/oAMj.xk3PxJVsTvGHJtXeIzkC"
      }
    },
    swimlists: {
      _model: "Swimlist",
      ulster: {
        title: "Ulster",
        userid: "->users.bart"
      },
      munster: {
        title: "Munster",
        userid: "->users.bart"
      },
      connaght: {
        title: "Connaght",
        userid: "->users.bart"
      },
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