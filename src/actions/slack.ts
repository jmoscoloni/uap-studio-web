'use server';

export async function sendSlackMessage(message: any, isError = true) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const siteName = process.env.SLACK_WEBHOOK_URL_SITENAME;
  const icon = isError ? 'red_circle' : ':large_green_circle:';

  if (!webhookUrl) return;

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: `---- :${icon}: *${siteName}* :${icon}: ----\n\`\`\`\n${message}\n\`\`\``
    })
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error('Failed to send Slack message');
  }
}
