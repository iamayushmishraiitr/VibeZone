import jwt  from "jsonwebtoken"
const SecretKey = "mishrajkpandaypathak";
const generateToken = (username:string, password:string) :string => {
  const token = jwt.sign(
    {
     username: username,
      password: password,
    },
    SecretKey,
    { expiresIn: '3d' }
  );
  return token;
};

export default generateToken