// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    data: {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Hello!"}]
    }
  })
  .then((response) => {
    res.status(200).json(response.data);
  })
}


