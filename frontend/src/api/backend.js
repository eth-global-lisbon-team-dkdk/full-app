import axios from 'axios';

// const data = {'address': '0x5fe2b58c013d7601147dcdd68c143a77499f5531', 'amount_matic': 10.0, 'symbol': 'grt', 'is_action': true, 'action_type': 'swap', 'links': []}

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
    return JSON.parse(response.data);
  })
  .catch((e) => console.log(e));
}