import { Resend } from 'resend';



async function sendEmail (recipient,{subject,body}) {
  const resend = new Resend(process.env.EMAIL_API_KEY);
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: [recipient],
    subject,
    html: body,
  });

  if (error) {
    return console.error({ error });
  }

  return data;
};

export default sendEmail;