import { Component } from "react";
import { Searchbar } from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";

export class App extends Component {
  state = {
    searchValue: "",
  };
  handleFormSubmit = ({ query }) => {
    this.setState({ searchValue: query });
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchResult={this.state.searchValue} />
      </div>
    );
  }
}
