import {chat} from './main.js';
async function main() {
  try {
    chat(
        'papo9292@gmail.com',
        'password1234',
        'Cuanto es 2+2',
        'math_problem_solver',
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error:', error);
        },
        () => {
          console.log('Stream completed');
        }
      );      
  } catch (error) {
    console.error('Error in the request:', error);
  }
}
main();