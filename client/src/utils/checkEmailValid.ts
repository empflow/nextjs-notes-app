export default function checkEmailValid(email: string) {
  const regex = /^\w+@\w+\.\w+$/;
  return regex.test(email);
}
