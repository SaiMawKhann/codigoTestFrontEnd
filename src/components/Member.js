import React, { Component } from "react";
import { variables } from "../Variables.js";

export class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      modalTitle: "",
      memberName: "",
      memberId: 0,
      mobileNumber: "",
      email: "",
      password: "",
      memberTotalPoint: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "Members")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ members: data, departmentsWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeMemberName = (e) => {
    this.setState({ memberName: e.target.value });
  };

  changeMobileNumber = (e) => {
    this.setState({ mobileNumber: e.target.value });
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  changeMemberTotalPoint = (e) => {
    this.setState({ memberTotalPoint: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Member",
      memberId: 0,
      memberName: "",
      mobileNumber: "",
      email: "",
      password: "",
      memberTotalPoint: "",
    });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit Member",
      memberId: dep.memberId,
      memberName: dep.memberName,
      mobileNumber: dep.mobileNumber,
      email: dep.email,
      password: dep.password,
      memberTotalPoint: dep.memberTotalPoint,
    });
  }

  createClick() {
    fetch(variables.API_URL + "Members", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberName: this.state.memberName,
        mobileNumber: this.state.mobileNumber,
        email: this.state.email,
        password: this.state.password,
        memberTotalPoint: this.state.memberTotalPoint,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick(memberId) {
    fetch(variables.API_URL + "Members/" + memberId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberId: memberId,
        memberName: this.state.memberName,
        mobileNumber: this.state.mobileNumber,
        email: this.state.email,
        password: this.state.password,
        memberTotalPoint: this.state.memberTotalPoint,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert(error);
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "Members/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  render() {
    const {
      members,
      modalTitle,
      memberId,
      memberName,
      mobileNumber,
      email,
      password,
      memberTotalPoint,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Add Member
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Member Id</th>
              <th>Member Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Password</th>
              <th>Total Point</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {members.map((dep) => (
              <tr key={dep.memberId}>
                <td>{dep.memberId}</td>
                <td>{dep.memberName}</td>
                <td>{dep.mobileNumber}</td>
                <td>{dep.email}</td>
                <td>{dep.password}</td>
                <td>{dep.memberTotalPoint}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(dep)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(dep.memberId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Member Name</span>
                  <input
                    type="text"
                    className="form-control"
                    value={memberName}
                    onChange={this.changeMemberName}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Mobile Number</span>
                  <input
                    type="text"
                    className="form-control"
                    value={mobileNumber}
                    onChange={this.changeMobileNumber}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Email</span>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={this.changeEmail}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Password</span>
                  <input
                    type="text"
                    className="form-control"
                    value={password}
                    onChange={this.changePassword}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Total Point</span>
                  <input
                    type="text"
                    className="form-control"
                    value={memberTotalPoint}
                    onChange={this.changeMemberTotalPoint}
                  />
                </div>

                {memberId == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {memberId != 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick(memberId)}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
