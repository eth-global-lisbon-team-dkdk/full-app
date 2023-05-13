import axios from 'axios';
import { stringify } from 'json5';

// const data = {"message":"<<LLM Chat Response to question: what is Ethereum? \n Will include informational and/or results of tool actions (e.g. Pepe price) and/or links to go and visit>>","template":["What is the price of Ethereum?","Where can I buy Ethereum?","What is the difference between Polygon and Ethereum?"]}

export async function postQuestion(question) {

  return await axios.post("https://zeazy--llm-api-llm-app.modal.run/query", {
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