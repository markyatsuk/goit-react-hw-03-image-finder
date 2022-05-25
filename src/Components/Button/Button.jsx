import { Component } from "react";
import PicturesApiService from "../FetchApi/FetchAPI";
import { Loader } from "../Loader/Loader";
const picturesApiService = new PicturesApiService();

class Button extends Component {
  state = {
    status: "resolved",
  };
  onLoadMoreClick = () => {
    this.setState({ status: "pending" });
    picturesApiService.query = this.props.searchValue;
    if (picturesApiService.page === 1) {
      picturesApiService.incrementPage();
    }

    picturesApiService.fetchPictures().then((fetchResponse) => {
      this.props.onLoadMore(fetchResponse.data.hits);
      if (12 * picturesApiService.page >= this.props.totalHits) {
        this.setState({ status: "rejected" });
      } else {
        this.setState({ status: "resolved" });
      }
    });
  };
  render() {
    const { status } = this.state;
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <button type="button" className="Button" onClick={this.onLoadMoreClick}>
          Load more
        </button>
      );
    }
  }
}

export { Button };
