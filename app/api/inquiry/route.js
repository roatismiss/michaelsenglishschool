import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENTS = [
  "info@michaelsenglishschool.com",
  "akiko@michaelsenglishschool.com",
  "nili@michaelsenglishschool.com",
  "michael@michaelsenglishschool.com",
  "ayonezawa1970@gmail.com",
  "nilirobertsatmes@gmail.com",
];

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Michael's English School <info@michaelsenglishschool.com>",
      to: RECIPIENTS,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #4361EE; margin-bottom: 24px;">New Inquiry — Michael's English School</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555; width: 120px;">Name</td>
              <td style="padding: 10px; color: #333;">${name}</td>
            </tr>
            <tr style="background: #f7f8ff;">
              <td style="padding: 10px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 10px; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #555;">Phone</td>
              <td style="padding: 10px; color: #333;">${phone || "—"}</td>
            </tr>
            <tr style="background: #f7f8ff;">
              <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
              <td style="padding: 10px; color: #333;">${message || "—"}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">Sent from michaelsenglishschool.com inquiry form</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
