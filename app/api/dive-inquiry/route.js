import { Resend } from "resend";

const RECIPIENTS = [
  "diveinenglish@blueorchidresort.com",
];

export async function POST(req) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, message } = await req.json();

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Michael's English School <info@michaelsenglishschool.com>",
      to: RECIPIENTS,
      replyTo: email,
      subject: `Dive Into English Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #4361EE; margin-bottom: 8px;">Dive Into English — New Inquiry</h2>
          <p style="color: #666; font-size: 13px; margin-bottom: 24px;">Sent from michaelsenglishschool.com/dive-into-english</p>
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
        </div>
      `,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Confirmation email to the sender
    await resend.emails.send({
      from: "Michael's English School <info@michaelsenglishschool.com>",
      to: [email],
      subject: "Thank you for your Dive Into English inquiry!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #4361EE; margin-bottom: 8px;">Thank you, ${name}!</h2>
          <p style="color: #666; font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
            We've received your inquiry about the <strong>Dive Into English</strong> programme at Blue Orchid Resort, Cebu, Philippines.
          </p>
          <p style="color: #666; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
            Our team will get back to you shortly with all the details about the programme, available dates, and how to reserve your spot.
          </p>
          <div style="background: #EEF1FF; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <h3 style="color: #4361EE; font-size: 14px; margin: 0 0 12px;">Programme Summary</h3>
            <p style="margin: 4px 0; font-size: 14px; color: #333;">✓ 5 days · 4 nights at Blue Orchid Resort</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333;">✓ PADI Open Water certification (all equipment included)</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333;">✓ English immersion sessions</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333;">✓ Round-trip airport transfer</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333;">✓ Daily breakfast + Kawasan Falls canyoneering</p>
            <p style="margin: 16px 0 0; font-size: 18px; font-weight: bold; color: #4361EE;">$899 USD per student</p>
          </div>
          <p style="color: #999; font-size: 13px;">Michael's English School · Tennoji & Furuichi, Osaka · michaelsenglishschool.com</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
