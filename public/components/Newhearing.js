import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { postData } from '../utils/fetch';
import Courts from './Courts';
import Date from './Date';

export default class NewHearing extends React.Component {
  state = {
    date: '',
    court: '',
    court_options: [],
    name: '',
    type: '',
    email: '',
    phone: '',
  };

  handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const key = target.name;
    this.setState({ [key]: value });
  };

  handleSelect = (option) => {
    console.log('Option', option);
    const { value, id } = option;
    console.log('value', value);
    console.log('id', id);
    this.setState({ [id]: value });
  }

  handleAutocomplete = (event) => {
    const { target } = event;
    const { value } = target;
    const url = '/match-court/';
    this.setState({ court: value }, () => {
      postData(url, this.state.court)
        .then(data =>
          this.setState({ court_options: data }));
    });
  }

  updateCourt = (selected) => {
    this.setState({ court: selected, court_options: [] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: this.state.date,
      court: this.state.court,
      name: this.state.name,
      type: this.state.type,
      email: this.state.email,
      phone: this.state.phone,
    };

    postData('/add-hearing', data)
      .then((response) => {
        if (response.success === true) {
          setTimeout(() => { this.props.history.push('/thanks?q=hearing'); }, 500);
        } else {
          this.setState({ database_error: 'Database error' }, () => {
            setTimeout(() => { this.setState({ duplicate_error: '' }); }, 1000);
          });
        }
      });
  }

  render() {
    const { error } = this.state;

    return (
      <React.Fragment >
        <h1>Add a new hearing</h1>
        <form className="form" onSubmit={this.handleSubmit}>

          <section className="form_section">
            <label htmlFor="date">Date:</label>
            <select
              id="date"
              name="date"
              className="select"
              value={this.state.date}
              onChange={this.handleChange}
            >
              <Date />
            </select>
          </section>

          <section className="form_section autocomplete">
            <label htmlFor="court">Court:</label>
            <input
              id="court"
              name="court"
              className="input"
              value={this.state.court}
              onChange={this.handleAutocomplete}
            />
            <ul className="list">
              {this.state.court_options.length > 0 && (
                <Courts courts={this.state.court_options} updateCourt={this.updateCourt} />
              )}
            </ul>
          </section>

          <h4>Contact details (optional):</h4>

          <section className="form_section">
            <label htmlFor="name">Name:</label>
            <input
              className="input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </section>

          <section className="form_section">
            <label htmlFor="type">I am a...</label>
            <Select
              name="type"
              id="type"
              value={this.state.type}
              onChange={this.handleSelect}
              options={[
                { value: 'Solicitor', label: 'Solicitor', id: 'type' },
                { value: 'Social worker', label: 'Social worker', id: 'type' },
                { value: 'Defendant', label: 'Defendant', id: 'type' },
                { value: 'Other', label: 'Other', id: 'type' },
              ]}
            />
            {/* <Select
              name="type"
              id="type"
              value={this.state.type}
              onChange={this.handleSelect}
              options={[
                { value: 'Solicitor', label: 'Solicitor', id: 'type' },
                { value: 'type', label: 'Social worker', id: 'type' },
                { value: 'type', label: 'Defendant', id: 'type' },
                { value: 'type', label: 'Other', id: 'type' },

              ]}
            /> */}
          </section>

          <section className="form_section">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              className="input"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </section>

          <section className="form_section">
            <label htmlFor="phone">Phone number:</label>
            <input
              type="text"
              name="phone"
              className="input"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </section>
          {error &&
            <section>
              <p className="form_error">Sorry, there has been an error with our database. Please try to add the hearing again.</p>
            </section>
          }
          <button type="submit">Add hearing</button>
        </form>
      </React.Fragment>
    );
  }
}
