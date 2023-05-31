import axios from "axios";

export default function handler(req, res) {
  const userInput = req.body.userDescription;

  const prompt = `Give me 7 hex colors that represent ${userInput} in a json format that looks like this object [{"color": "#F3B289", "description": "A peachy-orange color that might remind you of the color of a beach sunset."}]`;

  axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": prompt}]
    }
  })
  .then((response) => {
    console.log(response.data.choices[0].message.content);
    const colors = JSON.parse(response.data.choices[0].message.content);
    res.status(200).json(colors);
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send(error);
  })
}