                    import CodeExecuterStrategy, { ExecutionResponse } from '../types/CodeExecutorStrategy';
                    import { PYTHON_IMAGE } from '../utils/constants';
                    import createContainer from './containerFactory';
                    import decodeDockerStream from './dockerHelper';

                    class pythonExceuter implements CodeExecuterStrategy{

                    async execute(code: string, inputTestCases: string, outputTestcases: string): Promise<ExecutionResponse> {
                //  async execute(code: string, inputTestCases: string): Promise<ExecutionResponse> {
                    console.log(code,inputTestCases,outputTestcases);
                    
                        const rawLogBuffer:Buffer[]=[];
                        const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCases.replace(/'/g, `'\\"`)}'|python3 test.py`;
                        const pythonDockerContainer=await createContainer(PYTHON_IMAGE,[
                                '/bin/sh',
                                '-c',
                                runCommand]
                        );
                await pythonDockerContainer.start();
                        const loggerStream=await pythonDockerContainer.logs({
                            stdout:true,
                            stderr:true,
                            timestamps:false,
                            follow:true
                        });
                        loggerStream.on('data',(chunk:Buffer)=>{
                            rawLogBuffer.push(chunk);
                        });

                        let codeResponse;
                        try { 
                                codeResponse = await this.fetchDecodedStream(loggerStream,rawLogBuffer);
                                return {output:codeResponse,status:'completed'};
                            
                        } catch (error) {
                            return {output:error as string,status:'Error'};
                        }
                        finally{
                            await pythonDockerContainer.remove();
                        }
                    
                    }

                    fetchDecodedStream(loggerStream:NodeJS.ReadableStream,rawLogBuffer:Buffer[]): Promise<string> {
                        return new Promise((response,reject)=>{
                            const timeout=setTimeout(()=>{
                                console.log('Timer over');
                               return reject(new Error('TLE'));
                            },2000);
                    
                        loggerStream.on('end',()=>{
                            // This callback executes when the stream ends
                            clearTimeout(timeout);
                            console.log(rawLogBuffer);
                            const completeBuffer = Buffer.concat(rawLogBuffer);
                            const decodedStream = decodeDockerStream(completeBuffer);
                            // console.log(decodedStream);
                            // console.log(decodedStream.stdout);
                            if(decodedStream.stderr) {
                                return reject(new Error(decodedStream.stderr));
                            } else {
                                response(decodedStream.stdout);
                            }
                        });
                    });
                }
            }
 export default pythonExceuter;

