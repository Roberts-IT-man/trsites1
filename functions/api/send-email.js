export async function onRequestPost(context) {
  const data = await context.request.json()
  const { name, email, message } = data

  const payload = {
    personalizations: [
      { to: [{ email: "contact@trsites.xyz" }] }
    ],
    from: { email: "no-reply@trsites.xyz", name },
    subject: "New Contact Form Submission",
    content: [
      {
        type: "text/plain",
        value: `Name: ${name}
Email: ${email}

Message:
${message}`
      }
    ]
  }

  const result = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  if (!result.ok) {
    return new Response(JSON.stringify({ message: "MailChannels failed" }), { status: 500 })
  }

  return new Response(JSON.stringify({ message: "OK" }), { status: 200 })
}
