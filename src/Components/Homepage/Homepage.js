import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
class Homepage extends Component {
  state = {
    basicSalary: "",
    earningList: [
      {
        value: "",
        etf: false,
        warning: false,
      },
    ],
    deductionList: [
      {
        value: "",
      },
    ],
    grossEarning: "0",
    grossDeduction: "0",
    employeeEpfPerecentageEight: "0",
    employeeEPFPerecentageTwelve: "0",
    employeeETFFPerecentageThree: "0",
    CTC: "0",
    netSalary: "0",
  };

  basicSalarychangedhandler = async e => {
    if (e.target.value.trim().length > 0) {
      await this.setState({
        basicSalary: e.target.value,
      });
    } else {
      await this.setState({
        basicSalary: "",
      });
    }
    this.LoadAllcalculations();
  };

  addnewAllowanceOnclick = () => {
    this.setState(previousstate => {
      return {
        earningList: [
          ...previousstate.earningList,
          {
            value: "",
            etf: false,
          },
        ],
      };
    });
  };
  addnewDeductionOnclick = () => {
    this.setState(previousstate => {
      return {
        deductionList: [
          ...previousstate.deductionList,
          {
            value: "",
          },
        ],
      };
    });
  };
  removeAllowanceOnclick = async currentindex => {
    let newarray;

    newarray = [...this.state.earningList];
    newarray.splice(currentindex, 1);

    await this.setState({
      earningList: newarray,
    });

    this.LoadAllcalculations();
  };
  removeDeductionceAllowanceOnclick = async currentindex => {
    let newarray;
    newarray = [...this.state.deductionList];
    newarray.splice(currentindex, 1);

    await this.setState({
      deductionList: newarray,
    });
    this.LoadAllcalculations();
  };

  earningsValueChangedhandler = async (e, index) => {
    let newSettedObj = [...this.state.earningList];
    if (e.target.value.trim() > 0) {
      newSettedObj[index].value = e.target.value;
      newSettedObj[index].warning = false;
      await this.setState({ earningList: newSettedObj });
    } else {
      newSettedObj[index].etf = false;
      newSettedObj[index].value = "";
      await this.setState({ earningList: newSettedObj });
    }

    this.LoadAllcalculations();
  };

  earningsValueCheckedBoxChangedhandler = async (e, index) => {
    let newSettedObj = [...this.state.earningList];

    if (newSettedObj[index].value.trim() > 0) {
      newSettedObj[index].etf = e.target.checked;
      newSettedObj[index].warning = false;
      await this.setState({ earningList: newSettedObj });
    } else {
      newSettedObj[index].warning = true;
      await this.setState({
        earningList: newSettedObj,
      });
    }

    this.LoadAllcalculations();
  };
  deductionValueChangedhandler = async (e, index) => {
    let newSettedObj = [...this.state.deductionList];
    newSettedObj[index].value = e.target.value;

    await this.setState({ deductionList: newSettedObj });

    this.LoadAllcalculations();
  };

  renderDeduction() {
    const { deductionList } = this.state;
    if (deductionList.length == 0) return null;

    return deductionList.map((deduct, index) => (
      <div className="row justify-content-start align-items-center">
        <div className="col-md-8 pb-1">
          <input
            type="number"
            pattern="^[0-9]+(\\.[0-9]+)?$"
            required
            className="form-control"
            placeholder="Enter Deduction"
            onChange={e => this.deductionValueChangedhandler(e, index)}
            value={deduct.value}
          />
        </div>
        <div
          className="col-md-1 custom-pointer "
          onClick={() => this.removeDeductionceAllowanceOnclick(index)}
        >
          <div className="custom-close-icon-conatiner">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    ));
  }

  renderSalary() {
    const { earningList } = this.state;

    if (earningList.length === 0) return null;

    return earningList.map((earning, index) => (
      <div className="row justify-content-start align-items-center ">
        <div className="col-md-8 pb-1">
          <input
            type="number"
            pattern="^[0-9]+(\\.[0-9]+)?$"
            required
            className={"form-control " + (earning.warning ? "alerterror" : "")}
            placeholder="Enter Earnings"
            onChange={e => this.earningsValueChangedhandler(e, index)}
            value={earning.value}
          />
        </div>
        <div
          className="col-md-1 custom-pointer"
          onClick={() => this.removeAllowanceOnclick(index)}
        >
          <div className="custom-close-icon-conatiner">
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="col-md-3 ">
          <input
            type="checkbox"
            name="EPF/ETF"
            value="EPF/ETF"
            pattern="^[0-9]+(\\.[0-9]+)?$"
            checked={earning.etf}
            onChange={e => this.earningsValueCheckedBoxChangedhandler(e, index)}
          />
          <label className="ml-1 mb-0"> EPF/ETF</label>
        </div>
      </div>
    ));
  }

  calculateGrossEarning = () => {
    let totalGrossEarning = 0;
    let totalEarnings = 0;
    this.state.earningList.map(item => {
      totalEarnings = totalEarnings + Number(item.value);
      return item;
    });
    totalGrossEarning = Number(this.state.basicSalary) + totalEarnings;
    this.setState({
      grossEarning: totalGrossEarning,
    });
  };
  LoadAllcalculations() {
    this.calculateGrossEarning();
    this.calculateGrossDeduction();
    this.calculateEmployeeEpfEightPerecentage();
    this.calculateEmployeeEPFTwelvePerecentage();
    this.calculateEmployeeETFThreePerecentag();
    this.calculateNetSalary();
    this.calculateCTC();
  }
  calculateGrossDeduction = async () => {
    let totalGrossDeduction = 0;

    this.state.deductionList.map(item => {
      totalGrossDeduction = totalGrossDeduction + Number(item.value);
      return item;
    });
    await this.setState({
      grossDeduction: totalGrossDeduction,
    });
  };
  calculateEmployeeEpfEightPerecentage = async () => {
    let sumOfPF = 0;

    this.state.earningList.map(item => {
      if (item.etf) {
        sumOfPF = sumOfPF + Number(item.value);
      }
      return item;
    });

    let total = ((sumOfPF + Number(this.state.basicSalary)) * 8) / 100;

    await this.setState({
      employeeEpfPerecentageEight: total,
    });
  };

  calculateEmployeeEPFTwelvePerecentage = async () => {
    let sumOfPF = 0;

    this.state.earningList.map(item => {
      if (item.etf) {
        sumOfPF = sumOfPF + Number(item.value);
      }
      return item;
    });

    let total = ((sumOfPF + Number(this.state.basicSalary)) * 12) / 100;
    await this.setState({
      employeeEPFPerecentageTwelve: total,
    });
  };
  calculateEmployeeETFThreePerecentag = async () => {
    let sumOfPF = 0;

    this.state.earningList.map(item => {
      if (item.etf) {
        sumOfPF = sumOfPF + Number(item.value);
      }
      return item;
    });

    let total = ((sumOfPF + Number(this.state.basicSalary)) * 3) / 100;
    await this.setState({
      employeeETFFPerecentageThree: total,
    });
  };
  calculateNetSalary = async () => {
    let grossSalaryCalc = this.state.grossEarning;
    let grossDeductionCalc = this.state.grossDeduction;
    let employeeEpfPerecentageEightCalc =
      this.state.employeeEpfPerecentageEight;
    let total =
      Number(grossSalaryCalc) -
      (Number(grossDeductionCalc) + Number(employeeEpfPerecentageEightCalc));

    await this.setState({
      netSalary: total,
    });
  };

  calculateCTC = async () => {
    let grossSalaryCalc = this.state.grossEarning;
    let grossDeductionCalc = this.state.grossDeduction;
    let employeeEpfPerecentageTwelveCalc =
      this.state.employeeEPFPerecentageTwelve;
    let employeeETFFPerecentageThreeCalc =
      this.state.employeeETFFPerecentageThree;

    let GrossSalGrossDedu =
      Number(grossSalaryCalc) - Number(grossDeductionCalc);
    let total =
      Number(GrossSalGrossDedu) +
      (Number(employeeETFFPerecentageThreeCalc) +
        Number(employeeEpfPerecentageTwelveCalc));

    await this.setState({
      CTC: total,
    });
  };
  restFormHandler = async () => {
    await this.setState({
      basicSalary: "",
      earningList: [
        {
          value: "",
          etf: false,
          warning: false,
        },
      ],
      deductionList: [
        {
          value: "",
        },
      ],
      grossEarning: "0",
      grossDeduction: "0",
      employeeEpfPerecentageEight: "0",
      employeeEPFPerecentageTwelve: "0",
      employeeETFFPerecentageThree: "0",
      CTC: "0",
      netSalary: "0",
    });
  };

  render() {
    const {
      basicSalary,
      grossEarning,
      grossDeduction,
      employeeEpfPerecentageEight,
      employeeEPFPerecentageTwelve,
      employeeETFFPerecentageThree,
      CTC,
      netSalary,
    } = this.state;

    return (
      <section className=" py-5 mt-4 ">
        <div className="container">
          <div className="row">
            <div className="col-md-7 pb-2">
              <div className="card   card-body custom-colour-form1 p-4">
                <div className="row pb-3 align-items-center justify-content-between">
                  <div className="col-md-6">
                    <h5 className="font-weight-bold">Calculate your salary</h5>
                  </div>
                  <div className="col-md-3 offset-3 custom-reset ">
                    <i
                      className="fas fa-sync p-1 "
                      onClick={this.restFormHandler}
                    ></i>
                    <span className="p-1">Reset</span>
                  </div>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="number"
                          required
                          pattern="^[0-9]+(\\.[0-9]+)?$"
                          className="form-control"
                          placeholder="Basic salary"
                          onChange={this.basicSalarychangedhandler}
                          value={basicSalary}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div>
                        <h6 className="font-weight-bolder">Earnings</h6>
                      </div>
                      <div className="pt-1">
                        <span className="text-muted">
                          Allowance,fixed allowance,Bonus and etc
                        </span>
                      </div>
                    </div>
                  </div>
                  {this.renderSalary()}
                  <div className="row mt-3 ">
                    <div
                      className="col-md-12 custom-colour-addicon"
                      onClick={this.addnewAllowanceOnclick}
                    >
                      <span>+</span>
                      <span>Add new Allowance</span>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-8">
                      <div>
                        <h6 className="font-weight-bolder">Deduction</h6>
                      </div>
                      <div className="pt-1">
                        <span className="text-muted">
                          Salary advances,Loan Deduction and all
                        </span>
                      </div>
                    </div>
                  </div>
                  {this.renderDeduction()}
                  <div className="row mt-3 ">
                    <div
                      className="col-md-12 custom-colour-addicon"
                      onClick={this.addnewDeductionOnclick}
                    >
                      <span>+</span>
                      <span>Add new Deduction</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-5 pb-2">
              <div className="card   card-body custom-colour-form2 p-4">
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="font-weight-bold">Your salary</h6>
                  </div>
                </div>

                <div className="row pb-2">
                  <div className="col-md-6">
                    <span className="text-muted custom-font-size">Items</span>
                  </div>
                  <div className="col-md-6">
                    <span className="text-muted custom-font-size">Amount</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <span>Gross Earning</span>
                  </div>
                  <div className="col-md-6">
                    <span className=" custom-font-size2">{grossEarning}</span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <span>Gross Deduction</span>
                  </div>
                  <div className="col-md-6">
                    <span className=" custom-font-size2">{grossDeduction}</span>
                  </div>
                </div>

                <div className="row pb-4">
                  <div className="col-md-6">
                    <span>Employee Epf(8%)</span>
                  </div>
                  <div className="col-md-6">
                    <span className=" custom-font-size2">
                      {employeeEpfPerecentageEight}
                    </span>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-md-12 card   card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bold">
                          Net Salary(Take Home)
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="font-weight-bold">{netSalary}</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-muted custom-font-size mt-3">
                  Contribution from the Employer
                </span>

                <div className="row">
                  <div className="col-md-6">
                    <span>Employee EPF(12%)</span>
                  </div>
                  <div className="col-md-6">
                    <span className=" custom-font-size2">
                      {employeeEPFPerecentageTwelve}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <span>Employee ETF(3%)</span>
                  </div>
                  <div className="col-md-6">
                    <span className=" custom-font-size2">
                      {employeeETFFPerecentageThree}
                    </span>
                  </div>
                </div>

                <div className="row mt-4 pb-3">
                  <div className="col-md-6">
                    <span>CTC(Cost to Company)</span>
                  </div>
                  <div className="col-md-6">
                    <span className=" custom-font-size2">{CTC}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Homepage;
