import OpenAI from 'openai';


export async function resolve(taskContent) {
    const openai = new OpenAI();
    const moderation = await openai.moderations.create({ input: "I want to kill them." });

    console.log(moderation);
    return "TODO"
};
