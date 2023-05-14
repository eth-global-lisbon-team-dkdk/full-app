import axios from 'axios';

export async function postQuestion(question) {
  return await axios.post("https://zeazy--llm-api-v2-llm-app.modal.run/query", {
    query: question
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      }
    }
  )
  .then((response) => {
    console.log(response);
    console.log(response.data);
    console.log(JSON.parse(response.data));
    return JSON.parse(response.data);
  })
  .catch((e) => console.log(e));
}