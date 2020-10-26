import React from "react";
import "./Autocomplete.css";
import { getData } from "./getData";
// Don't change any declarations.
import debounce from "lodash/debounce";
class Autocomplete extends React.Component {
  state = {
    query: "",
    data: null,
    isLoading: false,
    showError: false,
  };
  componentDidMount() {
    const { query } = this.state;
    this.setState({ isLoading: true });
    getData(query).then((data) => {
      this.setState({ data, isLoading: false });
    });
  }
  debounceQuery = () => {
    const { query } = this.state;
    // makes request on every alternate keypress
    if (this.isValidQuery(query)) {
      const debouncedFn = debounce(this.fetchAndSetState, 500);
      debouncedFn(query);
    }
  };
  fetchAndSetState = (query) => {
    this.setState({ isLoading: true });
    return getData(query).then((data) => {
      this.setState({ data, isLoading: false });
    });
  };
  handleChange = (event) => {
    const {
      target: { value },
    } = event;

    this.setState(
      {
        query: value,
        showError: value.length > 0 && !this.isValidQuery(value),
      },
      () => {
        this.debounceQuery();
      }
    );
  };
  isValidQuery = (query) => {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(query);
  };
  handleClick = (event) => {
    const {
      target: { innerText },
    } = event;
    this.props.onSelectItem(innerText);
  };
  render() {
    const { query, data, showError, isLoading } = this.state;
    let styles = "control";
    // styles = isLoading && ["control", "is-loading"].join(" ");

    return (
      <div className="wrapper">
        <div className={isLoading ? `${styles} is-loading` : styles}>
          <input
            className="input"
            value={query}
            placeholder="search item.."
            onChange={this.handleChange}
          />
          {showError && <p className="error"> Only alphabets please...!!!</p>}
        </div>
        <div className="list">
          {data && data.length > 0
            ? data.map((item) => (
                <a className="list-item" key={item} onClick={this.handleClick}>
                  {item}
                </a>
              ))
            : query.length > 0 && (
                <p className="error"> Oops no matching results found...!!!</p>
              )}
        </div>
      </div>
    );
  }
}

export { Autocomplete };
