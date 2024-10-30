export default interface CodeExecuterStrategy{

    // execute(code:string,inputTestCases:string,outputTestcases:string):Promise<ExecutionResponse>;
    execute(code:string,inputTestCases:string,outputTestcases:string):Promise<ExecutionResponse>;



};

export type ExecutionResponse ={output:string, status:string};