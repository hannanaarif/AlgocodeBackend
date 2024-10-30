

import CodeExecuterStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
import { JAVA_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';
import pullImage from './pullImage';



class javaExecuter implements CodeExecuterStrategy{
     async execute(code: string, inputTestCases: string, outputTestcases: string): Promise<ExecutionResponse> {
    // async execute(code: string, inputTestCases: string): Promise<ExecutionResponse> {
     console.log(code,inputTestCases,outputTestcases);
        const rawLogBuffer:Buffer[]=[];
        await pullImage(JAVA_IMAGE);
        console.log('start executing the code provided');
        const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCases.replace(/'/g, `'\\"`)}' | java Main`;

   const javaDockerContainer=await createContainer(JAVA_IMAGE,['/bin/sh','-c',runCommand]);

   await javaDockerContainer.start();

   const loggerStream=await javaDockerContainer.logs({
       stdout: true,
       stderr: true,
       timestamps: false,
       follow: true
   });

   loggerStream.on('data',(chunks:Buffer)=>{
       rawLogBuffer.push(chunks);
   });
   try {
    const codeResponse=await this.fetchDecodedStream(loggerStream,rawLogBuffer);
    const trimmedResponse:string = (codeResponse as string).trim();
    if(trimmedResponse===outputTestcases.trim()) {
        return {output:codeResponse as string,status:'SUCCESS'};
    }
    else{
        return {output:codeResponse as string,status:'WA'};
    }
   } catch (error) {
    // console.log('Error message', error.message );
    // if(error.message === 'TLE') {
    //     await javaDockerContainer.kill();
    // }
    // return {output: error as string, status: 'ERROR'}
    if (error instanceof Error) {  // Type guard to check if it's an Error
        console.log('Error message', error.message);
        if (error.message === 'TLE') {
          await javaDockerContainer.kill();
        }
        return { output: error.message, status: 'ERROR' };
      } else {
        // Handle non-Error types
        return { output: String(error), status: 'ERROR' };
      }
  }
  finally{
    console.log('Removing image');
    await javaDockerContainer.remove();
  }
}
fetchDecodedStream(loggerStream:NodeJS.ReadableStream,rawLogBuffer:Buffer[]){
    return new Promise((Resolve,Reject) => {
        const timer=setTimeout(()=>{
            console.log('timer called');
            Reject(new Error('TLE'));
            },4000);

        loggerStream.on('end', () => {
           clearTimeout(timer);
            // Concatenate all collected log chunks into one complete buffer
            const completeStreamData = Buffer.concat(rawLogBuffer);
    
            // Decode the complete log stream
            const decodedStream = decodeDockerStream(completeStreamData);
    
            // Log the decoded stream for debugging purposes
            //console.log(decodedStream);
    
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
}
export default javaExecuter;





