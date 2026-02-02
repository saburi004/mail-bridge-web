import { sendEmail } from "quickmailer-sdk";

async function testSend() {
    try {
        const res = await sendEmail({
            to: "saburinikam@gmail.com",
            subject: "QuickMailer Test",
            message: "🎉 If you received this, your NPM package works!",
            apiKey: "pk_d93441bddb15dbb11c22d7b7f0ba44d5f15c569c8695522b"
        });

        console.log("✅ Email sent successfully:", res);
    } catch (err) {
        console.error("❌ Error sending email:", err.message);
    }
}

testSend();
