import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import "./Landing.css";

function Landing() {
  var [post, setPost] = useState("");
  var [postEdit, setPostEdit] = useState("");
  var [commentEdit, setCommentEdit] = useState("");
  var [comment, setComment] = useState("");
  var [posts, setPosts] = useState(
    localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : []
  );
  var [comments, setComments] = useState(
    localStorage.getItem("comments")
      ? JSON.parse(localStorage.getItem("comments"))
      : []
  );

  const postChange = (e) => {
    setPost(e.target.value);
  };

  const commentChange = (e) => {
    setComment(e.target.value);
  };

  const editPostChange = (e) => {
    setPostEdit(e.target.value);
  };

  const editCommentChange = (e) => {
    setCommentEdit(e.target.value);
  };

  const AddPost = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();

    if (localStorage.getItem("posts")) {
      let posts = JSON.parse(localStorage.getItem("posts"));
      localStorage.setItem(
        "post-id",
        JSON.parse(localStorage.getItem("post-id")) + 1
      );
      posts.unshift({
        id: JSON.parse(localStorage.getItem("post-id")),
        post: post,
        name: `${localStorage.getItem("fname")} ${localStorage.getItem(
          "lname"
        )}`,
        time: date,
        email: localStorage.getItem("email"),
      });
      localStorage.setItem("posts", JSON.stringify(posts));
    } else {
      localStorage.setItem("post-id", 0);
      let posts = [
        {
          id: JSON.parse(localStorage.getItem("post-id")),
          post: post,
          name: `${localStorage.getItem("fname")} ${localStorage.getItem(
            "lname"
          )}`,
          time: date,
          email: localStorage.getItem("email"),
        },
      ];
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  };

  const editPost = (e) => {
    e.preventDefault();
    var id = e.target.name;
    document.getElementById(`post-${id}`).style.display = "none";
    document.getElementById(`edit-${id}`).style.display = "";
    document.getElementById(`post-text-${id}`).innerText = "";
    document.getElementById(`input-edit-${id}`).value = e.target.id;
  };

  const editPostSubmit = (e) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();
    posts.map((ele, i) => {
      if (ele.id === parseInt(e.target.name)) {
        var id = i;
        var editedPost = {
          id: parseInt(e.target.name),
          post: postEdit,
          name: `${localStorage.getItem("fname")} ${localStorage.getItem(
            "lname"
          )}`,
          time: date,
          email: localStorage.getItem("email"),
          edited: "true",
        };
        posts = JSON.parse(localStorage.getItem("posts"));
        posts.splice(id, 1);
        posts.unshift(editedPost);
        localStorage.setItem("posts", JSON.stringify(posts));
      }
    });
  };
  const editCommentSubmit = (e) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();
    comments.map((ele, i) => {
      if (ele.id === parseInt(e.target.name)) {
        var id = i;
        var post_id = e.target.id;
        var editedComment = {
          comment: commentEdit,
          time: date,
          name: `${localStorage.getItem("fname")} ${localStorage.getItem(
            "lname"
          )}`,
          post_id: parseInt(post_id),
          edited: "true",
          id: parseInt(e.target.name),
          user: localStorage.getItem("email"),
        };
        comments = JSON.parse(localStorage.getItem("comments"));
        comments.splice(id, 1);
        comments.unshift(editedComment);
        localStorage.setItem("comments", JSON.stringify(comments));
      }
    });
  };
  const deletePost = (e) => {
    posts.map((ele, i) => {
      if (ele.id === parseInt(e.target.name)) {
        var id = i;
        posts = JSON.parse(localStorage.getItem("posts"));
        posts.splice(id, 1);
        localStorage.setItem("posts", JSON.stringify(posts));
      }
    });
  };
  const addComment = (e) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes();
    if (localStorage.getItem("comments")) {
      var comments = JSON.parse(localStorage.getItem("comments"));
      var count = comments.length;
      comments.push({
        comment: comment,
        time: date,
        name: `${localStorage.getItem("fname")} ${localStorage.getItem(
          "lname"
        )}`,
        post_id: parseInt(e.target.name),
        id: count,
        user: localStorage.getItem("email"),
      });
      localStorage.setItem("comments", JSON.stringify(comments));
    } else {
      comments = [];
      comments.push({
        comment: comment,
        time: date,
        name: `${localStorage.getItem("fname")} ${localStorage.getItem(
          "lname"
        )}`,
        id: 0,
        post_id: parseInt(e.target.name),
        user: localStorage.getItem("email"),
      });
      localStorage.setItem("comments", JSON.stringify(comments));
    }
    window.location.assign("/");
  };

  const editComment = (e) => {
    e.preventDefault();
    var id = e.target.name;
    document.getElementById(`comment-${id}`).style.display = "none";
    document.getElementById(`comment-edit-${id}`).style.display = "";
    document.getElementById(`comment-text-${id}`).innerText = "";
    document.getElementById(`input-comment-edit-${id}`).value = e.target.id;
  };

  const deleteComment = (e) => {
    comments.map((ele, i) => {
      if (ele.id === parseInt(e.target.name)) {
        var id = i;
        comments = JSON.parse(localStorage.getItem("comments"));
        comments.splice(id, 1);
        localStorage.setItem("comments", JSON.stringify(comments));
      }
    });
  };

  const Cancel = () => {
    window.location.assign("/");
  };
  return (
    <div className="content1">
      {!localStorage.getItem("email") ? (
        <img
          style={{
            boxShadow: "0px 4px 28px 0px rgba(0,0,0,0.75)",
            marginTop: "50px",
          }}
          width="370px"
          height="370px"
          src="./social.jpg"
          alt=""
        />
      ) : (
        ""
      )}
      {localStorage.getItem("email") ? (
        <form classNme="form-container">
          <div className="ui form form-container">
            <div className="field">
              <h2 for="post">Add Post</h2>
              <textarea id="post" rows="3" onChange={postChange}></textarea>
            </div>
            <button className="ui button" onClick={AddPost}>
              Add Post
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
      {localStorage.getItem("email") ? (
        posts.map((ele) => {
          return (
            <div className="ui feed post">
              <div className="event">
                <div className="label">
                  <img src="./images.png" alt="user" />
                </div>
                <div className="content post-text">
                  <div className="summary">
                    <a className="user" href="/">
                      {ele.name}
                    </a>{" "}
                    <div className="date">{ele.time}</div>
                  </div>
                  <div className="post-text">
                    <span
                      id={`post-text-${ele.id}`}
                      style={{ fontSize: "larger" }}
                    >
                      {ele.post}
                    </span>
                    <small>{ele.edited == "true" ? " (Edited)" : ""}</small>
                    {localStorage.getItem("email") === ele.email ? (
                      <div>
                        <span id={`post-${ele.id}`}>
                          <a
                            style={{
                              textDecoration: "underline",
                              color: "red",
                            }}
                            onClick={deletePost}
                            name={ele.id}
                            href="/"
                          >
                            Delete
                          </a>{" "}
                          <a
                            style={{
                              textDecoration: "underline",
                              color: "green",
                            }}
                            onClick={editPost}
                            name={ele.id}
                            id={ele.post}
                            href="/"
                          >
                            Edit
                          </a>{" "}
                        </span>
                        <span style={{ display: "none" }} id={`edit-${ele.id}`}>
                          <input
                            name={ele.id}
                            onChange={editPostChange}
                            type="text"
                            id={`input-edit-${ele.id}`}
                          />
                          <a
                            style={{
                              textDecoration: "underline",
                              color: "green",
                            }}
                            onClick={editPostSubmit}
                            name={ele.id}
                            href="/"
                          >
                            Save
                          </a>{" "}
                          <a
                            style={{
                              textDecoration: "underline",
                              color: "red",
                            }}
                            onClick={Cancel}
                            name={ele.id}
                            href="/"
                          >
                            Cancel
                          </a>{" "}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* Comments */}
                  {comments
                    .filter((e) => {
                      return ele.id === e.post_id;
                    })
                    .map((comment) => {
                      return (
                        <div className="ui feed comment comment-color">
                          <div className="event">
                            <div className="label">
                              <img src="./images.png" alt="user" />
                            </div>
                            <div className="content post-text">
                              <div className="summary">
                                <a className="user" href="/">
                                  {comment.name}
                                </a>{" "}
                                <div className="date">{comment.time}</div>
                              </div>
                              <p className="post-text">
                                <span id={`comment-text-${comment.id}`}>
                                  {comment.comment}
                                </span>
                                <small>
                                  {comment.edited == "true" ? " (Edited)" : ""}
                                </small>
                                {localStorage.getItem("email") ===
                                comment.user ? (
                                  <div>
                                    <span id={`comment-${comment.id}`}>
                                      <a
                                        style={{
                                          textDecoration: "underline",
                                          color: "red",
                                        }}
                                        onClick={deleteComment}
                                        name={comment.id}
                                        href="/"
                                      >
                                        Delete
                                      </a>{" "}
                                      <a
                                        style={{
                                          textDecoration: "underline",
                                          color: "green",
                                        }}
                                        onClick={editComment}
                                        name={comment.id}
                                        id={comment.comment}
                                        href="/"
                                      >
                                        Edit
                                      </a>{" "}
                                    </span>
                                    <span
                                      style={{ display: "none" }}
                                      id={`comment-edit-${comment.id}`}
                                    >
                                      <input
                                        name={ele.id}
                                        onChange={editCommentChange}
                                        type="text"
                                        id={`input-comment-edit-${comment.id}`}
                                      />
                                      <a
                                        style={{
                                          textDecoration: "underline",
                                          color: "green",
                                        }}
                                        onClick={editCommentSubmit}
                                        name={comment.id}
                                        href="/"
                                        id={comment.post_id}
                                      >
                                        Save
                                      </a>{" "}
                                      <a
                                        style={{
                                          textDecoration: "underline",
                                          color: "red",
                                        }}
                                        onClick={Cancel}
                                        name={comment.id}
                                        href="/"
                                      >
                                        Cancel
                                      </a>{" "}
                                    </span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {/* Comments */}
                  <div className="ui form">
                    <div className="field">
                      <label htmlFor="">Add Comment</label>
                      <input onChange={commentChange} type="text" />
                    </div>
                    <input
                      type="button"
                      className="button ui"
                      name={ele.id}
                      onClick={addComment}
                      value="Comment"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3 className="text-center">
          <a style={{ textDecoration: "underline" }} href="/login">
            Login
          </a>{" "}
          or{" "}
          <a style={{ textDecoration: "underline" }} href="/Signup">
            Sign Up
          </a>{" "}
          to View and Add Posts and Comments
        </h3>
      )}
    </div>
  );
}

export default Landing;
