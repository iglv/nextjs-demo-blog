// Server side (/api/submit.js)
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const captchaResponse = req.body.captcha;

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=6LfQMRUnAAAAAJ7aliTMg_BRXIZcXWdqLhU9Q5qr&response=${captchaResponse}`;

    const response = await fetch(verifyURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });

    const data = await response.json();

    if (data.success) {
      // reCAPTCHA validation passed, you can continue with your logic here
      res.status(200).json({message: 'Successfully validated reCAPTCHA'});
    } else {
      // Handle failed reCAPTCHA validation
      res.status(400).json({message: 'Failed captcha verification'});
    }
  } else {
    res.status(405).json({message: 'Only POST requests are allowed'});
  }
}
