import React from 'react';

const SQuiz = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,overflow:'auto',}}>
      <h1>QUIZ</h1>
      <iframe
        title="Google Form"
        src="https://quizizz.com/signup?source=top_nav_login_button&ctaSource=top_nav_signup_button&ref=header_tab&webflow_referrer=webflow&lng=en"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        style={{ maxWidth: '100%' }}
      >
        Loading...
      </iframe>
    </div>
  );
};

export default SQuiz;
