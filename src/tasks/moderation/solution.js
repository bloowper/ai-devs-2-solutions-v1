import OpenAI from 'openai';


export async function resolve(taskContent) {
    const openai = new OpenAI()
    const moderations = await Promise.all(
        taskContent.input.map(async (content) => {
            const moderation = await openai.moderations.create({ input: content });
            return moderation;
        }
        )
    )
    return moderations.map(moderation => moderation.results[0].flagged ? 1 : 0);
};
