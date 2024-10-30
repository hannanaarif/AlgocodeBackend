import CodeExecuterStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';


class cppExecuter implements CodeExecuterStrategy{
 // async execute(code: string, inputTestCases: string, outputTestcases: string): Promise<ExecutionResponse> {
  async execute(code: string, inputTestCases: string): Promise<ExecutionResponse> {

    const rawLogBuffer:Buffer[]=[];

    const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCases.replace(/'/g, `'\\"`)}' | ./main`;
  
    console.log('Initialising a new cpp docker container');
  
    const cppDockercontainer= await createContainer(CPP_IMAGE,['/bin/sh','-c',runCommand]);
  
    await cppDockercontainer.start();
  
    const loggerStream=await cppDockercontainer.logs({
      stdout:true,
      stderr:true,
      timestamps:false,
      follow:true
    });
  
    loggerStream.on('data',(chunk:Buffer)=>{
      rawLogBuffer.push(chunk);
    });

    try {
      const codeResponse=await this.fetchDecodedStream(loggerStream,rawLogBuffer);
      return {output:codeResponse as string,status:'completed'};
      
    } catch (error) {
      return {output:error as string,status:'Error'};
    }
    finally{
      await cppDockercontainer.remove();
    }
  }
  fetchDecodedStream(loggerStream:NodeJS.ReadableStream,rawLogBuffer:Buffer[]){
    return new Promise((Resolve,Reject) => {
        const timer=setTimeout(()=>{
            console.log('timer called');
            Reject(new Error('TLE'));
        },2000);
        loggerStream.on('end', () => {
            clearTimeout(timer);
            // Concatenate all collected log chunks into one complete buffer
            const completeStreamData = Buffer.concat(rawLogBuffer);
    
            // Decode the complete log stream
            const decodedStream = decodeDockerStream(completeStreamData);
    
            // Log the decoded stream for debugging purposes
            console.log(decodedStream);
    
            // Resolve the promise with the decoded log stream
            if(decodedStream.stderr){
                Reject(new Error(decodedStream.stderr));
            }
            else{
                Resolve(decodedStream.stdout);
            }
          });
       });
   }

  /*fetchDecodedStream(loggerStream:NodeJS.ReadableStream,rawLogBuffer:Buffer[]){
    return new Promise((resolve,reject)=>{
      const timer=setTimeout((resolve,reject)=>{
        console.log('timmer called');
        reject(new Error('TLE'));
      },2000);

      loggerStream.on('end',()=>{
        clearTimeout(timer);
        const completeBuffer=Buffer.concat(rawLogBuffer);
        const decodedStream=decodeDockerStream(completeBuffer);
        if(decodedStream.stderr){
          reject(new Error('decodedStream.stderr'));
        }
        else{
          resolve(decodedStream.stdout);
        }
      });
      loggerStream.on('error', (error) => {
        clearTimeout(timer);
        reject(new Error(`Logger Stream Error: ${error}`));
      });
    });
  }*/
}

export default cppExecuter;

// async function runCPP(code:string,inputTestCase:string){
//   const rawLogBuffer:Buffer[]=[];

//   const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;

//   console.log('Initialising a new cpp docker container');

//   const cppDockercontainer= await createContainer(CPP_IMAGE,['/bin/sh','-c',runCommand]);

//   await cppDockercontainer.start();

//   const loggerStream=await cppDockercontainer.logs({
//     stdout:true,
//     stderr:true,
//     timestamps:false,
//     follow:true
//   });

//   loggerStream.on('data',(chunk:Buffer)=>{
//     rawLogBuffer.push(chunk);
//   });
//   const response = await new Promise((res) => {
//   loggerStream.on('end',()=>{
//     const completeBuffer=Buffer.concat(rawLogBuffer);
//     const decodedStream=decodeDockerStream(completeBuffer);
//     console.log(decodedStream);;
//     res(decodedStream);
//   });

// });
//   await cppDockercontainer.remove();
//   return response;
// }
// export default runCPP;

