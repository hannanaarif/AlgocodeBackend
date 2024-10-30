import express, { RequestHandler } from 'express';

import serverAdapter from './config/bullBoardUiConfig';
import serverConfig from './config/serverConfig';
//import runCPP from './containers/runCPPDocker';
//import submissionQueueProducer from './producers/submissionQueueProducer';
import apirouter from './routes';
import { submission_queue } from './utils/constants';
import SubmissionWorker from './workers/submissionWorker';
//import SampleWorker from './workers/SampleWorker';

const app=express();
const PORT=serverConfig.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse text bodies
app.use(express.text());

app.use('/api',apirouter);

app.use('/dashboard',serverAdapter.getRouter() as RequestHandler);


app.listen(PORT,()=>{
    console.log(`server started at :${PORT}`);

    console.log(`BullBoard is running at http://localhost:${PORT}/dashboard`);
    
    //SampleWorker('SampleQueue');

   SubmissionWorker(submission_queue);

    

    //CPP

/*const userCode = `
  
    class Solution {
      public:
      vector<int> permute() {
          vector<int> v;
          v.push_back(10);
          return v;
      }
    };
  `;

  const code = `
  #include<iostream>
  #include<vector>
  #include<stdio.h>
  using namespace std;
  
  ${userCode}

  int main() {

    Solution s;
    vector<int> result = s.permute();
    for(int x : result) {
      cout<<x<<" ";
    }
    cout<<endl;
    return 0;
  }
  `;

const inputCase = `10
`;

void submissionQueueProducer({'1234': {
        language: 'CPP',
        inputCase,
        code
      }});*/
  
//void runCPP(code, inputCase);


    //java

//     const javaCode = `
// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scanner = new Scanner(System.in);
//         String x = scanner.nextLine();
//         String y = scanner.nextLine();
//         System.out.println("value of x is " + x);
//         System.out.println("value of y is " + y);
//     }
// }
// `;

// const inputTestCase = '100\n200\n';

// void runJava(javaCode, inputTestCase);

   //python 
//     const code =`x = input()
// y = input()
// print("value of x is", x)
// print("value of y is", y)
// `;
//     const inputCase = `100
//     200`;
    // const code = `
    //       x = input()
    //       y = input()
    //       print("value of x is", x)
    //       print("value of y is", y)`.trim();   
    // void runPython(code, inputCase);
    // void sampleQueueProducer('Samplejob', {
    //     name: 'Sanket',
    //     company: 'Microsoft',
    //     position: 'SDE 2'
    // },2);
    // void sampleQueueProducer('Samplejob', {
    //     name: 'Sarthak',
    //     company: 'Microsoft',
    //     position: 'SDE 2'
    // },1);
});