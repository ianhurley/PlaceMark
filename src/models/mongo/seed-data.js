export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "$2a$10$4GnPiLaYswmjciFchzSBL.LdM5YCnIHXseKsV4raz.GXaxbRb.OB."
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "$2a$10$x7jwdlv8I/KQ.pRWqk5YgeW.N5qFu6fM9c16KZGKGxl98mSPy0Cyu"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "$2a$10$jtgaoeSYAzcYr2B1I2nPc.5K6ie.X8Nsevu2xuqqt/3vM5/D0T3ri"
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
      spot_4 : {
        name: "Glenariff Waterfall",
        county: "Antrim",
        latitude: "55.016669",
        longitude: "-6.098735",
        categorey: "Waterfalls",
        swimlistid: "->swimlists.ulster"
      },
      spot_5 : {
        name: "Lough Neagh",
        county: "Armagh",
        latitude: "54.497022",
        longitude: "-6.383097",
        categorey: "Loughs",
        swimlistid: "->swimlists.ulster"
      },
      spot_6 : {
        name: "Spanish Point",
        county: "Clare",
        latitude: "52.846068",
        longitude: "-9.439465",
        categorey: "The Sea",
        swimlistid: "->swimlists.munster"
      },
      spot_7 : {
        name: "Clare Glens Waterfalls",
        county: "Limerick",
        latitude: "52.690209",
        longitude: "-8.399969",
        categorey: "Waterfalls",
        swimlistid: "->swimlists.munster"
      },
      spot_8 : {
        name: "Kilfarrasy Strand",
        county: "Waterford",
        latitude: "52.134581",
        longitude: "-7.232617",
        categorey: "The Sea",
        swimlistid: "->swimlists.munster"
      },
      spot_9 : {
        name: "Doorly Park",
        county: "Sligo",
        latitude: "54.26481",
        longitude: "-8.445792",
        categorey: "Rivers",
        swimlistid: "->swimlists.connaght"
      },
      spot_10 : {
        name: "Keem Bay",
        county: "Mayo",
        latitude: "53.967295",
        longitude: "-10.192863",
        categorey: "The Sea",
        swimlistid: "->swimlists.connaght"
      },
    },
  };