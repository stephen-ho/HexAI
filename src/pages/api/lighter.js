import axios from "axios";

export default function handler(req, res) {
  const colors = req.body.colors;
  // from the request I expect a string of hex colors
  // from the response I want an array of objects with hex colors and their descriptions
    // {colors: [{color: #F3B289, description: "A peachy-orange color that might remind you of the color of a beach sunset."}, ...]}

    const prompt = `Given these 7 hex colors: "${colors}" please provide me colors one shade lighter in json formatted like this example: "[{"color": "#F3B289", "description": "A peachy-orange color that might remind you of the color of a beach sunset."}]"`;

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
    const lighter = JSON.parse(response.data.choices[0].message.content);
    res.status(200).json(lighter);
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send();
  })
}