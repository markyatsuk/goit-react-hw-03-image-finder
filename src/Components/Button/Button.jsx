import { Component } from "react";
import PicturesApiService from "../FetchApi/FetchAPI";
import { Loader } from "../Loader/Loader";
const picturesApiService = new PicturesApiService();

class Button extends Component {
  state = {
    status: "resolved",
  };
  onLoadMore = () => {
    this.setState({ status: "pending" });
    picturesApiService.fetchPictures().then((fetchResponse) => {
      if (
        fetchResponse.data.hits * picturesApiService.page >
        this.props.totalHits
      ) {
        this.setState({ status: "rejected" });
      }
      this.setState({ status: "resolved" });
      this.props.onLoadMore(fetchResponse.data.hits);
    });
  };
  render() {
    const { status } = this.state;
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <button type="button" className="Button" onClick={this.onLoadMore}>
          Load more
        </button>
      );
    }
  }
}

export { Button };
