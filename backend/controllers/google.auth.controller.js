import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const authController = async (req, res) => {
  const { credential, clientId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    console.log("Google OAuth Payload:", payload);
    
    const userid = payload["sub"];
    res.status(200).json({ payload });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export default authController;