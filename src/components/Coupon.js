import React, { Component } from "react";
import { variables } from "../Variables.js";

export class Coupon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coupons: [],
      modalTitle: "",
      couponName: "",
      couponId: 0,
      discountAmount: "",
      startDate: "",
      endDate: "",
      quantity: "",
      status: "",

      DepartmentIdFilter: "",
      DepartmentNameFilter: "",
      departmentsWithoutFilter: [],
    };
  }

  refreshList() {
    fetch(variables.API_URL + "Coupons")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ coupons: data, departmentsWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeCouponName = (e) => {
    this.setState({ couponName: e.target.value });
  };

  changediscountAmount = (e) => {
    this.setState({ discountAmount: e.target.value });
  };

  changeStartDate= (e) => {
    this.setState({ startDate: e.target.value });
  };

  changeEndDate= (e) => {
    this.setState({ endDate: e.target.value });
  };

  changeQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  };

  changeStatus = (e) => {
    this.setState({ status : e.target.value });
  };


  addClick() {
    this.setState({
      modalTitle: "Add Coupon",
      couponName: "",
      couponId: 0,
      discountAmount: "",
      startDate: "",
      endDate: "",
      quantity: "",
      status: "",
    });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit Coupon",
      couponId: dep.couponId,
      couponName: dep.couponName,
      discountAmount: dep.discountAmount,
      startDate: dep.startDate,
      endDate: dep.endDate,
      quantity: dep.quantity,
      status: dep.status,
    });
  }

  createClick() {
    fetch(variables.API_URL + "Coupons", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        couponName: this.state.couponName,
        discountAmount: this.state.discountAmount,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        quantity: this.state.quantity,
        statusbar: this.state.status,
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
    fetch(variables.API_URL + "Coupons/" + memberId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        couponId: this.state.couponId,
        couponName: this.state.couponName,
        discountAmount: this.state.discountAmount,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        quantity: this.state.quantity,
        status: this.state.status,
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
      fetch(variables.API_URL + "Coupons/" + id, {
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
      coupons,
      discountAmount,
      couponId,
      couponName,
      startDate,
      endDate,
      quantity,
      status,
      modalTitle,
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
          Add Coupon
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Coupon Id</th>
              <th>Coupon Name</th>
              <th>discount Amount</th>
              <th>Start</th>
              <th>End</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Options</th>

            </tr>
          </thead>
          <tbody>
            {coupons.map((dep) => (
              <tr key={dep.couponId}>
                <td>{dep.couponId}</td>
                <td>{dep.couponName}</td>
                <td>{dep.discountAmount}</td>
                <td>{dep.startDate}</td>
                <td>{dep.endDate}</td>
                <td>{dep.quantity}</td>
                <td>{dep.status}</td>
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
                    onClick={() => this.deleteClick(dep.couponId)}
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
                  <span className="input-group-text">Coupon Name</span>
                  <input
                    type="text"
                    className="form-control"
                    value={couponName}
                    onChange={this.changeCouponName}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Discount Amount</span>
                  <input
                    type="text"
                    className="form-control"
                    value={discountAmount}
                    onChange={this.changediscountAmount}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Start</span>
                  <input
                    type="text"
                    className="form-control"
                    value={startDate}
                    onChange={this.changeStartDate}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">End</span>
                  <input
                    type="text"
                    className="form-control"
                    value={endDate}
                    onChange={this.changeEndDate}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Quantity</span>
                  <input
                    type="text"
                    className="form-control"
                    value={quantity}
                    onChange={this.changeQuantity}
                  />
                </div>

                {couponId == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {couponId != 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick(couponId)}
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
