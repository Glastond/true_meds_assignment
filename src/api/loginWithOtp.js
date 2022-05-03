import axios from "axios";

const loginwithOtp = async (number, otp) => {
  let result;
  const url = `https://stage-services.truemeds.in/CustomerService/verifyOtp?mobileNo=${number}&otp=${otp}&deviceKey=abcd&isIos=false&source=react_interview`;

  try {
    result = await axios.post(url, null, {
      headers: { transactionId: "react_interview" },
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default loginwithOtp;
