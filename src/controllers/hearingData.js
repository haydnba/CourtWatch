/* eslint-disable */
const { addHearing, getHearing } = require('../database/query');
const { emailAlert } = require('../messaging/emailAlert');

exports.get = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Get hearing reached")
    const hearing = await getHearing(id, {});
    console.log("Hearing", hearing)
    res.send(hearing);
  } catch (err) {
    console.log('getHearing error', err);
  }
};

exports.post = (req, res) => {
  const { date, court_name, name, type, email, number, notes } = req.body;

  // function to retrieve court id

  const contact = [
    {
      name,
      type,
      email,
      number,
    },
  ];

  addHearing({
    date,
    court_name,
    contact,
    notes,
  });

  // emailAlert(
  //   null,
  //   'name contact',
  //   'WIP Alert: Upcoming Hearing',
  //   'This is going to be a big string of text we need you please help!',
  // );
};
