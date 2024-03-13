import axios from "axios";
const API_URL = "http://localhost:8081/api/posts";
const API_URL_Unregister = "http://localhost:8081/api/unregister";

class PostService {
  post(title, description) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/profile/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getAll() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL_Unregister + "/", {
      headers: {
        Authorization: token,
      },
    });
  }

  getOtherProfilePost(_id) {
    return axios.get(API_URL_Unregister + "/profile/" + _id);
  }

  liked(userId, postId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/like",
      { userId, postId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getComment(postId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL_Unregister + "/comment/" + postId, {
      headers: {
        Authorization: token,
      },
    });
  }

  commentLike(userId, commentId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/comment/like",
      { userId, commentId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  writeComment(postId, commentText) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/comment",
      { postId, commentText },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  getCurrentViewPost() {
    return JSON.parse(localStorage.getItem("viewPost"));
  }

  getWriterProfile() {
    return JSON.parse(localStorage.getItem("otherProfile"));
  }

  edit(title, description, postId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/" + postId,
      { title, description },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  delete(postId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + postId, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new PostService();
