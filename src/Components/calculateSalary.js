const customCalculationOnPerecentage = (
  arningList,
  percentage,
  basicSalary
) => {
  let sum = 0;

  arningList.map(item => {
    if (item.etf) {
      sum = sum + Number(item.value);
    }
    return item;
  });
  let total = ((sum + Number(basicSalary)) * percentage) / 100;

  return total;
};

//calculate grosssalary
const calculateGrossEarning = (earningList, basicSalary) => {
  let totalGrossEarning = 0;
  let totalEarnings = 0;
  earningList.map(item => {
    totalEarnings = totalEarnings + Number(item.value);
    return item;
  });
  totalGrossEarning = Number(basicSalary) + totalEarnings;
  return totalGrossEarning;
};

//claculate grossdeduction
const calculateGrossDeduction = deductionList => {
  let totalGrossDeduction = 0;

  deductionList.map(item => {
    totalGrossDeduction = totalGrossDeduction + Number(item.value);
    return item;
  });

  return totalGrossDeduction;
};

const calculateCTC = (
  grossEarning,
  grossDeduction,
  employeeEPFPerecentageTwelve,
  employeeETFFPerecentageThree
) => {
  let grossSalaryCalc = grossEarning;
  let grossDeductionCalc = grossDeduction;
  let employeeEpfPerecentageTwelveCalc = employeeEPFPerecentageTwelve;
  let employeeETFFPerecentageThreeCalc = employeeETFFPerecentageThree;

  let GrossSalGrossDedu = Number(grossSalaryCalc) - Number(grossDeductionCalc);
  let total =
    Number(GrossSalGrossDedu) +
    (Number(employeeETFFPerecentageThreeCalc) +
      Number(employeeEpfPerecentageTwelveCalc));

  return total;
};
const calculateNetSalary = (
  grossEarning,
  grossDeduction,
  employeeEpfPerecentageEight
) => {
  let grossSalaryCalc = grossEarning;
  let grossDeductionCalc = grossDeduction;
  let employeeEpfPerecentageEightCalc = employeeEpfPerecentageEight;
  let total =
    Number(grossSalaryCalc) -
    (Number(grossDeductionCalc) + Number(employeeEpfPerecentageEightCalc));
  return total;
};

export const calculatetions = (earninglist, basicsalary, deductionlist) => {
  console.log("earninh list " + earninglist);
  const grossEarning = calculateGrossEarning(earninglist, basicsalary);
  console.log("uuuu");
  const grossDeduction = calculateGrossDeduction(deductionlist);
  const employeeEpfPerecentageEight = customCalculationOnPerecentage(
    earninglist,
    8,
    basicsalary
  );
  const employeeEPFPerecentageTwelve = customCalculationOnPerecentage(
    earninglist,
    12,
    basicsalary
  );
  const employeeETFFPerecentageThree = customCalculationOnPerecentage(
    earninglist,
    3,
    basicsalary
  );
  const CTC = calculateCTC(
    grossEarning,
    grossDeduction,
    employeeEPFPerecentageTwelve,
    employeeETFFPerecentageThree
  );
  const netSalary = calculateNetSalary(
    grossEarning,
    grossDeduction,
    employeeEpfPerecentageEight
  );
  return {
    grossEarning,
    grossDeduction,
    employeeEpfPerecentageEight,
    employeeEPFPerecentageTwelve,
    employeeETFFPerecentageThree,
    CTC,
    netSalary,
  };
};
