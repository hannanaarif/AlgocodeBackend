import DockerStreamOutput from '../types/dockerStreamOutput';
import { DOCKER_STREAM_HEADER_SIZE } from '../utils/constants';


export default function decodeDockerStream(buffer:Buffer):DockerStreamOutput{

    let offset=0;
    const output:DockerStreamOutput={stdout:'',stderr:''};

    while(offset<buffer.length){

        const typeStream=buffer[offset];
        const length=buffer.readUInt32BE(offset + 4);;

        offset += DOCKER_STREAM_HEADER_SIZE;

        if(typeStream===1){
          output.stdout+=buffer.toString('utf-8',offset,offset+length);
        }

        else if(typeStream===2){
          output.stderr+=buffer.toString('utf-8',offset,offset+length);

        }

        offset+=length;
    }
    return output;
}
