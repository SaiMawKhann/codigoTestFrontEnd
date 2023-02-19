import React, { Component } from "react";
import { variables } from "../Variables.js";

export class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      modalTitle: "",
      couponName: "",
      coupon_id: 0,
      member_id: "",
      member_Name: "",
      receipt_no: "",
      usedDate: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "reports")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ reports: data, departmentsWithoutFilter: data });
      });
  }



  componentDidMount() {
    this.refreshList();
  }

  updateClick() {
    fetch(variables.API_URL + `reports/GetReportByCouponId/${"1"}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({ reports: data, departmentsWithoutFilter: data });
    });
   
  }

  render() {
    const {
      reports,
      modalTitle,
      coupon_id,
      couponName,
      member_id,
      member_Name,
      receipt_no,
      usedDate,
    } = this.state;

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Coupon Name</th>
              <th>Member Code</th>
              <th>Member Name</th>
              <th>Receipt No</th>
              <th>Used Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((dep) => (
              <tr key={dep.coupon_id}>
                <td>{dep.coupon_id}</td>
                <td>{dep.couponName}</td>
                <td>{dep.member_id}</td>
                <td>{dep.member_Name}</td>
                <td>{dep.receipt_no}</td>
                <td>{dep.usedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
