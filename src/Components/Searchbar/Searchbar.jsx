import { Component } from "react";
import { ImSearch } from "react-icons/im";
import Notiflix from "notiflix";

class Searchbar extends Component {
  state = {
    query: "",
  };
  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      Notiflix.Notify.warning("Please, enter a request");
      return;
    }
    this.props.onSubmit(this.state);
    this.setState({ query: "" });
    e.target.reset();
  };
  render() {
    return (
      <header className="Searchbar">
        <form
          className="SearchForm"
          id="search-form"
          onSubmit={this.handleSubmit}
        >
          <button type="submit" className="SearchForm-button">
            <ImSearch />
          </button>

          <input
            className="search-form__input"
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
