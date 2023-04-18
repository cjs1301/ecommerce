import { ServerApplication } from './application/server.app';
(async (): Promise<void> => {
    await runApplication();
})();

async function runApplication(): Promise<void> {
    const serverApplication: ServerApplication = ServerApplication.new();
    await serverApplication.run();
}
