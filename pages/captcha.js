import {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Post() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([{name: 'John', comment: 'Hello', likes: 5}]);

  const [captchaValue, setCaptchaValue] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/captcha', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({captcha: captchaValue}),
    });

    if (res.ok) {
      setSuccessMessage('Captcha successfully verified!');
    } else {
      // Handle failed captcha verification
      const data = await res.json();
      setSuccessMessage(`Verification failed: ${data.message}`);
    }
  };

  const onChange = (value) => {
    setCaptchaValue(value);
    // timeout
    setTimeout(() => {
      handleSubmit(new Event('submit')); // Trigger form submit
    }, 3000);
  };

  return (
    <div>
      <Head>
        <title>Captcha</title>
      </Head>

      <p style={{paddingBottom: '1rem'}}>
        <Link href="/">Back</Link>
      </p>

      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <ReCAPTCHA sitekey="6LfQMRUnAAAAALXp2hTqNP4ke9M6hH8w35zOD-b6" onChange={onChange} />
        <button type="submit" style={{display: 'none'}}>
          Submit
        </button>{' '}
        {/* Hide the submit button as it's not needed anymore */}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
}
