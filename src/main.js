#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import EnvironmentVariables from './Envs.js';
import CommandLineArguments from './ComandLineArguments.js';
import AiDevsRestClient from './AiDevs.js';

const argv = yargs(hideBin(process.argv)).argv;


EnvironmentVariables.initialize()
CommandLineArguments.initialize()
const aiDevsRestClient = new AiDevsRestClient(EnvironmentVariables.getAiDevsApiKey());


async function main() {
    try {
        var taskName = CommandLineArguments.getTaskName()
        console.log(`Requesting aiDevs for [${taskName}] task token`)
        const aiDevsTaskTokenResponse = await aiDevsRestClient.getTaskToken(taskName);
        console.log(`Token respponse received`);
        console.log(aiDevsTaskTokenResponse);
        console.log(`Requesting aiDevs for [${aiDevsTaskTokenResponse.token}] task content`)
        const aiDevsTaskContent = await aiDevsRestClient.getTaskDescriptionById(aiDevsTaskTokenResponse.token)
        console.log(`Task content received`);
        console.log(aiDevsTaskContent);
        console.log(`Getting resolver for task ${taskName}`)
        const taskResolver = await import(`./tasks/${taskName}/solution.js`);
        const solutionToTask = await taskResolver.resolve(aiDevsTaskContent)
        console.log(`Solution to task resolved`);
        console.log(solutionToTask);
        const aiDevsTaskReviewAnswer = await aiDevsRestClient.postAnswer(
            aiDevsTaskTokenResponse.token,
            {answer: solutionToTask}
        )
        console.log(`Solution posted to aiDevs`);
        console.log(aiDevsTaskReviewAnswer);
        if(aiDevsTaskReviewAnswer.code === 0){
            console.log(`Task solved successfully`);
        }
        else{
            console.log(`Task not solved successfully`);
        }
    } catch (error) {
        console.error('An error occurred:');
        console.error(error);
    }
}


main();