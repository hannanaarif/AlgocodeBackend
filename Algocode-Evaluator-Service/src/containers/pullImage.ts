import Docker from 'dockerode';

export default async function pullImage(imageName: string) {
    try {
        const docker = new Docker();
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (res, rej) => {
            await docker.pull(imageName, (err: Error, stream: NodeJS.ReadableStream) => {
                if(err) throw err;
                docker.modem.followProgress(stream, (err, response) => err ? rej(err) : res(response), (event) => {
                    console.log(event);
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}