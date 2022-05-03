import axios from "axios";

const getOtp = async (number) => {
  let result;
  const url =
    "https://stage-services.truemeds.in/CustomerService/sendOtp?mobileNo=" +
    number;

  try {
    result = await axios.post(url, null, {
      headers: { transactionId: "react_interview" },
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default getOtp;
